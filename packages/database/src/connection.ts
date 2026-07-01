/**
 * PostgreSQL Database Connection
 * Manages database connection pool and provides query utilities
 */

import { Pool, PoolConfig, QueryResult } from 'pg';

let pool: Pool | null = null;

/**
 * Get environment variable with default value
 */
function getEnv(key: string, defaultValue: string): string {
	return process.env[key] || defaultValue;
}

/**
 * Get environment variable as number with default value
 */
function getEnvNumber(key: string, defaultValue: number): number {
	const value = process.env[key];
	if (!value) return defaultValue;
	const num = parseInt(value, 10);
	return isNaN(num) ? defaultValue : num;
}

/**
 * Check if running in development mode
 */
function isDevelopment(): boolean {
	return getEnv('NODE_ENV', 'development') === 'development';
}

/**
 * Get or create the database connection pool
 */
function getPool(): Pool {
	if (!pool) {
		/**
		 * Database connection pool configuration
		 */
		const poolConfig: PoolConfig = {
			host: getEnv('DATABASE_HOST', 'localhost'),
			port: getEnvNumber('DATABASE_PORT', 5432),
			database: getEnv('DATABASE_NAME', 'weekendwheresg'),
			user: getEnv('DATABASE_USER', 'postgres'),
			password: getEnv('DATABASE_PASSWORD', 'postgres'),
			max: 20, // Maximum number of clients in the pool
			idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
			connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
		};

		// In development, disable SSL for local connections
		if (isDevelopment()) {
			poolConfig.ssl = false;
		} else {
			// In production, check the DATABASE_SSL environment variable
			const useSSL = getEnv('DATABASE_SSL', 'false') === 'true';
			if (useSSL) {
				poolConfig.ssl = {
					rejectUnauthorized: false, // For production, consider setting this to true with proper CA
				};
			}
		}

		/**
		 * PostgreSQL connection pool
		 */
		pool = new Pool(poolConfig);

		/**
		 * Handle database pool errors
		 */
		pool.on('error', (err) => {
			console.error('Unexpected error on idle client', err);
		});
	}

	return pool;
}

/**
 * Get the pool (exported for compatibility)
 */
export { getPool as pool };

/**
 * Test database connection
 * @returns Promise<boolean> - true if connection successful
 */
export async function testConnection(): Promise<boolean> {
	try {
		const currentPool = getPool();
		const client = await currentPool.connect();
		const result = await client.query('SELECT NOW() as current_time');
		client.release();
		console.log('✅ Database connection successful:', result.rows[0].current_time);
		return true;
	} catch (error) {
		console.error('❌ Database connection failed:', error);
		return false;
	}
}

/**
 * Execute a SQL query
 * @param text - SQL query string
 * @param params - Query parameters
 * @returns Promise<QueryResult>
 */
export async function query(text: string, params?: any[]): Promise<QueryResult> {
	const start = Date.now();
	try {
		const currentPool = getPool();
		const result = await currentPool.query(text, params);
		const duration = Date.now() - start;
		console.log('Executed query', { text, duration, rows: result.rowCount });
		return result;
	} catch (error) {
		console.error('Query error:', { text, error });
		throw error;
	}
}

/**
 * Get a client from the pool for transactions
 * @returns Promise with client that should be released when done
 */
export async function getClient() {
	const currentPool = getPool();
	const client = await currentPool.connect();
	return client;
}

/**
 * Close all database connections
 * Call this when shutting down the application
 */
export async function closePool(): Promise<void> {
	try {
		if (pool) {
			await pool.end();
			console.log('✅ Database pool closed');
		}
	} catch (error) {
		console.error('❌ Error closing database pool:', error);
		throw error;
	}
}