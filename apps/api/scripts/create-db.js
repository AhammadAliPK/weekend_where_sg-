/**
 * Database Creation Script
 * Creates the WeekendWhere SG database if it doesn't exist
 */

import { Pool } from 'pg';

const adminConfig = {
	host: process.env.DATABASE_HOST || 'localhost',
	port: parseInt(process.env.DATABASE_PORT || '5432'),
	user: process.env.DATABASE_USER || 'postgres',
	password: process.env.DATABASE_PASSWORD || 'postgres',
	database: 'postgres', // Connect to default database first
};

const dbName = process.env.DATABASE_NAME || 'weekendwheresg';

async function createDatabase() {
	const adminPool = new Pool(adminConfig);

	try {
		console.log('🔗 Connecting to PostgreSQL...');
		await adminPool.query('SELECT NOW()');
		console.log('✅ Connected successfully');

		// Check if database exists
		console.log(`📂 Checking if database '${dbName}' exists...`);
		const result = await adminPool.query(
			'SELECT 1 FROM pg_database WHERE datname = $1',
			[dbName]
		);

		if (result.rows.length > 0) {
			console.log(`ℹ️  Database '${dbName}' already exists`);
		} else {
			// Create database
			console.log(`📦 Creating database '${dbName}'...`);
			await adminPool.query(`CREATE DATABASE ${dbName}`);
			console.log(`✅ Database '${dbName}' created successfully`);
		}

		console.log('\n🎉 Database setup complete!');
		console.log('\nNext steps:');
		console.log('  1. Start the API server: cd apps/api && pnpm dev');
		console.log('  2. The server will initialize the schema automatically');
	} catch (error) {
		console.error('❌ Database creation failed:', error);
		process.exit(1);
	} finally {
		await adminPool.end();
	}
}

createDatabase();
