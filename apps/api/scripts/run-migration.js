#!/usr/bin/env node

/**
 * WeekendWhere SG - Database Migration Runner
 * Runs migrations from the @weekend-where-sg/database package
 */

import { spawn } from 'child_process';

const command = process.argv[2] || 'migrate';

console.log('🚀 Running database migration from @weekend-where-sg/database package...');

// Run the migration script from the database package
const migrateProcess = spawn('npx', ['tsx', '../../packages/database/src/migrate.ts', command], {
	stdio: 'inherit',
	shell: true
});

migrateProcess.on('close', (code) => {
	process.exit(code || 0);
});

migrateProcess.on('error', (err) => {
	console.error('❌ Failed to run migration:', err);
	process.exit(1);
});
