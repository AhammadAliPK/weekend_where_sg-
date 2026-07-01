/**
 * Database Initialization
 * Sets up the database schema and performs initial data seeding
 */

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { query, testConnection } from './connection.js';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load parks data from the API package data directory
 */
async function loadParksData() {
	try {
		// Determine the base path (handle both dev and production)
		let basePath: string;
		if (__dirname.includes('dist')) {
			// Production: __dirname is packages/database/dist
			basePath = join(__dirname, '../..');
		} else {
			// Development: __dirname is packages/database/src
			basePath = join(__dirname, '../..');
		}

		// Try to load from API package
		const apiDataPath = join(basePath, 'apps/api/src/data/parks.json');
		try {
			const parksData = await readFile(apiDataPath, 'utf-8');
			return JSON.parse(parksData);
		} catch {
			// Fallback to database package data directory
			const dbDataPath = join(basePath, 'packages/database/data/parks.json');
			const parksData = await readFile(dbDataPath, 'utf-8');
			return JSON.parse(parksData);
		}
	} catch (error) {
		console.warn('⚠️  Could not load parks data:', error);
		return [];
	}
}

/**
 * Initialize the database schema
 * Reads and executes the schema.sql file
 */
export async function initializeSchema(): Promise<void> {
	try {
		console.log('🔧 Initializing database schema...');

		// Read the schema file (handle both dev and production environments)
		let schemaPath: string;
		try {
			// Try dist directory first (production)
			schemaPath = join(__dirname, 'schema.sql');
			await readFile(schemaPath, 'utf-8');
		} catch {
			// Fall back to src directory (development)
			schemaPath = join(__dirname, '../src/schema.sql');
		}
		const schema = await readFile(schemaPath, 'utf-8');

		// Split by semicolon, but handle PL/pgSQL blocks (functions, triggers)
		// PL/pgSQL code is delimited by $$ ... $$
		const statements: string[] = [];
		let currentStatement = '';
		let inPgSQLBlock = false;

		const lines = schema.split('\n');
		for (const line of lines) {
			const trimmed = line.trim();

			// Skip empty lines and comments
			if (!trimmed || trimmed.startsWith('--')) {
				continue;
			}

			// Track PL/pgSQL block delimiters
			if (trimmed.includes('$$')) {
				inPgSQLBlock = !inPgSQLBlock;
				currentStatement += line + '\n';
				continue;
			}

			currentStatement += line + '\n';

			// If we're not in a PL/pgSQL block and hit a semicolon, execute the statement
			if (!inPgSQLBlock && trimmed.endsWith(';')) {
				const statement = currentStatement.trim();
				if (statement) {
					statements.push(statement);
				}
				currentStatement = '';
			}
		}

		// Execute any remaining statement
		if (currentStatement.trim()) {
			statements.push(currentStatement.trim());
		}

		let executed = 0;
		let skipped = 0;

		for (const statement of statements) {
			try {
				await query(statement);
				executed++;
			} catch (error: any) {
				// Ignore errors for CREATE IF NOT EXISTS statements
				if (error.message.includes('already exists') || error.message.includes('does not exist')) {
					skipped++;
				} else {
					console.warn('Schema statement warning:', error.message);
				}
			}
		}

		console.log(`✅ Database schema initialized: ${executed} statements executed, ${skipped} skipped`);
	} catch (error) {
		console.error('❌ Failed to initialize database schema:', error);
		throw error;
	}
}

/**
 * Seed initial data for development
 */
export async function seedDevelopmentData(): Promise<void> {
	try {
		console.log('🌱 Seeding development data...');

		// Check if we already have data
		const result = await query('SELECT COUNT(*) as count FROM parks');
		const parkCount = parseInt(result.rows[0].count);

		if (parkCount > 0) {
			console.log('ℹ️  Database already contains data, skipping seed');
			return;
		}

		// Load parks from the JSON file
		const parks = await loadParksData();

		if (!parks || parks.length === 0) {
			console.log('ℹ️  No parks data found, skipping seed');
			return;
		}

		console.log(`📦 Loading ${parks.length} parks into database...`);

		// Insert parks using the database service
		const { upsertPark } = await import('./database.js');

		for (const park of parks) {
			try {
				await upsertPark({
					id: park.id,
					name: park.name,
					region: park.region,
					description: park.description,
					signals: park.signals,
					opening_hours: park.opening_hours || {},
					facilities: park.amenities || [],
					accessibility: park.accessibility || {},
					crowd_level: park.crowd_level || {},
					mrt_stations: park.mrt_stations || [],
					latitude: park.latitude || null,
					longitude: park.longitude || null,
					address: park.address || null
				});
			} catch (error) {
				console.warn(`Failed to insert park ${park.name}:`, error);
			}
		}

		console.log('✅ Development data seeded successfully');
	} catch (error) {
		console.error('❌ Failed to seed development data:', error);
		throw error;
	}
}

/**
 * Complete database initialization
 * Tests connection, initializes schema, and seeds data
 */
export async function initializeDatabase(): Promise<void> {
	try {
		// Test database connection
		const connected = await testConnection();
		if (!connected) {
			throw new Error('Failed to connect to database');
		}

		// Initialize schema
		await initializeSchema();

		// Seed development data
		await seedDevelopmentData();

		console.log('🎉 Database initialization complete');
	} catch (error) {
		console.error('💥 Database initialization failed:', error);
		throw error;
	}
}