#!/usr/bin/env node

/**
 * WeekendWhere SG - Database Migration Script
 * Run this script to initialize the database schema and seed development data
 *
 * Usage:
 *   node migrate.js              # Initialize schema and seed data
 *   node migrate.js --schema    # Initialize schema only
 *   node migrate.js --seed      # Seed data only
 *   node migrate.js --reset     # Reset database (WARNING: deletes all data)
 */

import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Pool } from 'pg';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'migrate'; // Default to full migration

/**
 * Database configuration from environment
 */
const dbConfig = {
	host: process.env.DATABASE_HOST || 'localhost',
	port: parseInt(process.env.DATABASE_PORT || '5432'),
	database: process.env.DATABASE_NAME || 'weekendwheresg',
	user: process.env.DATABASE_USER || 'postgres',
	password: process.env.DATABASE_PASSWORD,
};

/**
 * Colors for terminal output
 */
const colors: Record<string, string> = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	green: '\x1b[32m',
	red: '\x1b[31m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
	const colorCode = colors[color] || colors.reset;
	console.log(`${colorCode}${message}${colors.reset}`);
}

/**
 * Create a database connection pool
 */
function createPool(): Pool {
	return new Pool(dbConfig);
}

/**
 * Load parks data from the API package data directory
 */
async function loadParksData() {
	try {
		// Try to load from API package first
		const apiDataPath = join(__dirname, '../../../apps/api/src/data/parks.json');
		try {
			const parksData = await readFile(apiDataPath, 'utf-8');
			return JSON.parse(parksData);
		} catch {
			// Fallback to database package data directory
			const dbDataPath = join(__dirname, '../data/parks.json');
			const parksData = await readFile(dbDataPath, 'utf-8');
			return JSON.parse(parksData);
		}
	} catch (error) {
		console.warn('⚠️  Could not load parks data:', error);
		return [];
	}
}

/**
 * Execute SQL schema file
 */
async function executeSchema(pool: Pool, schemaPath: string): Promise<void> {
	log('📜 Reading schema file...', 'cyan');
	const schema = await readFile(schemaPath, 'utf-8');
	log(`✅ Schema file loaded (${schema.length} characters)`, 'green');

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

	log(`📝 Found ${statements.length} SQL statements to execute`, 'cyan');

	let executed = 0;
	let skipped = 0;

	for (let i = 0; i < statements.length; i++) {
		const statement = statements[i];
		try {
			await pool.query(statement);
			executed++;
			process.stdout.write(`\r✅ Executing ${i + 1}/${statements.length} statements`);
		} catch (error: any) {
			// Ignore errors for CREATE IF NOT EXISTS statements
			if (error.message.includes('already exists') || error.message.includes('does not exist')) {
				skipped++;
				process.stdout.write(`\r⊙️ Skipping ${i + 1}/${statements.length} (already exists)`);
			} else {
				console.error('\n❌ Statement failed:', error.message);
				console.error('Statement:', statement.substring(0, 200) + '...');
				throw error;
			}
		}
	}

	console.log(`\r✅ Executed ${executed} statements, skipped ${skipped} existing objects`, 'green');
}

/**
 * Seed development data
 */
async function seedDevelopmentData(pool: Pool): Promise<void> {
	log('🌱 Checking existing data...', 'cyan');

	const result = await pool.query('SELECT COUNT(*) as count FROM parks');
	const parkCount = parseInt(result.rows[0].count);

	if (parkCount > 0) {
		log(`ℹ️  Database already contains ${parkCount} parks, skipping seed`, 'yellow');
		return;
	}

	log('📦 Loading parks from JSON...', 'cyan');

	const parks = await loadParksData();

	if (!parks || parks.length === 0) {
		log('ℹ️  No parks data found, skipping seed', 'yellow');
		return;
	}

	log(`📊 Found ${parks.length} parks to load`, 'cyan');

	let loaded = 0;
	for (const park of parks) {
		try {
			// Convert park data to database format
			const parkData = {
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
			};

			await pool.query(`
				INSERT INTO parks (
					id, name, region, description, signals, opening_hours, facilities,
					accessibility, crowd_level, mrt_stations, latitude, longitude, address
				) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
				ON CONFLICT (id) DO UPDATE SET
					name = EXCLUDED.name,
					region = EXCLUDED.region,
					description = EXCLUDED.description,
					signals = EXCLUDED.signals,
					opening_hours = EXCLUDED.opening_hours,
					facilities = EXCLUDED.facilities,
					accessibility = EXCLUDED.accessibility,
					crowd_level = EXCLUDED.crowd_level,
					mrt_stations = EXCLUDED.mrt_stations,
					latitude = EXCLUDED.latitude,
					longitude = EXCLUDED.longitude,
					address = EXCLUDED.address,
					updated_at = CURRENT_TIMESTAMP
			`, [
				parkData.id, parkData.name, parkData.region, parkData.description,
				JSON.stringify(parkData.signals),
				JSON.stringify(parkData.opening_hours),
				JSON.stringify(parkData.facilities),
				JSON.stringify(parkData.accessibility),
				JSON.stringify(parkData.crowd_level),
				JSON.stringify(parkData.mrt_stations),
				parkData.latitude,
				parkData.longitude,
				parkData.address
			]);

			loaded++;
			process.stdout.write(`\r🌳 Loaded ${loaded}/${parks.length} parks`);
		} catch (error: any) {
			console.error(`\n❌ Failed to load park ${park.name}:`, error.message);
		}
	}

	console.log(`\n✅ Successfully loaded ${loaded} parks`, 'green');
}

/**
 * Reset database (WARNING: Deletes all data)
 */
async function resetDatabase(pool: Pool): Promise<void> {
	log('⚠️  WARNING: This will delete ALL data in the database!', 'red');
	log('🗑️  Dropping all tables...', 'yellow');

	const tables = ['search_history', 'reviews', 'favorites', 'parks', 'users'];

	for (const table of tables) {
		try {
			await pool.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
			log(`   ✓ Dropped table: ${table}`, 'green');
		} catch (error: any) {
			log(`   ✗ Failed to drop ${table}: ${error.message}`, 'red');
		}
	}

	// Drop views
	const views = ['user_stats', 'park_popularity', 'park_ratings'];
	for (const view of views) {
		try {
			await pool.query(`DROP VIEW IF EXISTS ${view} CASCADE`);
			log(`   ✓ Dropped view: ${view}`, 'green');
		} catch (error: any) {
			// Ignore view errors
		}
	}

	log('✅ Database reset complete', 'green');
}

/**
 * Main migration function
 */
async function migrate(): Promise<void> {
	// Validate environment variables
	if (!dbConfig.password) {
		log('❌ DATABASE_PASSWORD not set in environment variables!', 'red');
		log('💡 Make sure you have a .env file with DATABASE_PASSWORD set', 'yellow');
		process.exit(1);
	}

	const pool = createPool();

	try {
		log('🔗 Connecting to database...', 'cyan');
		log(`   Host: ${dbConfig.host}:${dbConfig.port}`, 'cyan');
		log(`   Database: ${dbConfig.database}`, 'cyan');
		log(`   User: ${dbConfig.user}`, 'cyan');

		await pool.query('SELECT NOW()');
		log('✅ Database connection successful', 'green');

		log(`📊 Database: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, 'cyan');

		// Execute based on command
		switch (command) {
			case 'schema':
				log('🎯 Running schema migration only...', 'blue');
				await executeSchema(pool, join(__dirname, 'schema.sql'));
				break;

			case 'seed':
				log('🎯 Running data seed only...', 'blue');
				await seedDevelopmentData(pool);
				break;

			case 'reset':
				log('🎯 Resetting database...', 'red');
				await resetDatabase(pool);
				log('🔄 Running full migration after reset...', 'yellow');
				await executeSchema(pool, join(__dirname, 'schema.sql'));
				await seedDevelopmentData(pool);
				break;

			case 'migrate':
			default:
				log('🎯 Running full migration (schema + seed)...', 'blue');
				await executeSchema(pool, join(__dirname, 'schema.sql'));
				await seedDevelopmentData(pool);
				break;
		}

		log('\n🎉 Migration complete!', 'green');
		log('\n📝 Next steps:', 'cyan');
		log('   1. Start the API server: cd apps/api && pnpm dev');
		log('   2. Start the frontend: cd apps/web && pnpm dev');
		log('   3. Open http://localhost:5173');
		log('\n🧪 Test user credentials:', 'yellow');
		log('   Email: test@example.com');
		log('   Password: password123');

	} catch (error: any) {
		console.error('\n💥 Migration failed:', error.message);
		console.error(error);
		process.exit(1);
	} finally {
		await pool.end();
		log('\n✅ Database connection closed', 'green');
	}
}

// Show usage if requested
if (args.includes('--help') || args.includes('-h')) {
	console.log(`
WeekendWhere SG - Database Migration Script

Usage:
  node migrate.js [command]

Commands:
  migrate     Full migration (schema + seed) [default]
  schema      Initialize database schema only
  seed        Seed development data only
  reset       Reset database (WARNING: deletes all data)
  --help, -h  Show this help message

Examples:
  node migrate.js              # Full migration
  node migrate.js schema       # Schema only
  node migrate.js seed         # Seed only
  node migrate.js reset        # Reset and migrate

Environment Variables:
  DATABASE_HOST     Database host (default: localhost)
  DATABASE_PORT     Database port (default: 5432)
  DATABASE_NAME     Database name (default: weekendwheresg)
  DATABASE_USER     Database user (default: postgres)
  DATABASE_PASSWORD Database password (default: postgres)
	`);
	process.exit(0);
}

// Run migration
migrate();