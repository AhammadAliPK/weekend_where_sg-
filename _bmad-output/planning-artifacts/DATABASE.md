# WeekendWhere SG - Database Setup Guide

This guide explains how to set up and configure the PostgreSQL database for WeekendWhere SG.

## Prerequisites

### PostgreSQL Installation

You need PostgreSQL installed and running locally.

**macOS:**
```bash
# Install PostgreSQL
brew install postgresql@15
brew services start postgresql@15

# Verify installation
psql --version
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Verify installation
psql --version
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

## Quick Start

### 1. Create the Database

**Option A: Using the setup script (Recommended)**
```bash
cd apps/api
./scripts/setup-db.sh
```

**Option B: Manual creation**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE weekendwheresg;

# Exit
\q
```

### 2. Configure Environment Variables

Add/update these variables in `apps/api/.env`:

```bash
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=weekendwheresg
DATABASE_USER=postgres
DATABASE_PASSWORD=your-password
DATABASE_SSL=false
```

### 3. Start the Server

```bash
cd apps/api
pnpm dev
```

The server will automatically:
- ✅ Test database connection
- ✅ Initialize database schema
- ✅ Load sample park data
- ✅ Create test user

## Database Schema

### Tables

#### **users**
Stores user account information and preferences.

```sql
- id (UUID, primary key)
- email (VARCHAR, unique)
- password_hash (VARCHAR)
- name (VARCHAR)
- preferences (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- last_login (TIMESTAMP)
- is_active (BOOLEAN)
```

#### **parks**
Stores park information including facilities, MRT stations, and location data.

```sql
- id (VARCHAR, primary key)
- name (VARCHAR)
- region (VARCHAR)
- description (TEXT)
- signals (JSONB)
- opening_hours (JSONB)
- facilities (JSONB)
- accessibility (JSONB)
- crowd_level (JSONB)
- mrt_stations (JSONB)
- latitude (DECIMAL)
- longitude (DECIMAL)
- address (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### **favorites**
Stores users' favorite parks.

```sql
- id (UUID, primary key)
- user_id (UUID, foreign key → users)
- park_id (VARCHAR, foreign key → parks)
- created_at (TIMESTAMP)
- UNIQUE(user_id, park_id)
```

#### **reviews**
Stores user reviews and ratings for parks.

```sql
- id (UUID, primary key)
- user_id (UUID, foreign key → users)
- park_id (VARCHAR, foreign key → parks)
- rating (INTEGER, 1-5)
- review_text (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- UNIQUE(user_id, park_id)
```

#### **search_history**
Stores users' search history for recommendations.

```sql
- id (UUID, primary key)
- user_id (UUID, foreign key → users)
- region (VARCHAR)
- activity (VARCHAR)
- preference (VARCHAR)
- searched_at (TIMESTAMP)
```

### Views

#### **park_ratings**
Aggregated ratings for each park.

#### **park_popularity**
Favorite count for each park.

#### **user_stats**
User statistics (favorites count, reviews count).

### Indexes

All frequently queried columns are indexed:
- User lookups by email
- Park lookups by region
- User favorites and reviews
- Recent searches
- Location-based queries (using GiST)

## Database Features

### JSONB Columns

We use PostgreSQL's JSONB for flexible data storage:

- **user.preferences**: Store favorite regions, activities, etc.
- **parks.signals**: Store park signals (cycling, family, nature, etc.)
- **parks.facilities**: Store facility information
- **parks.mrt_stations**: Array of nearby MRT stations

### Triggers

Automatic timestamp updates:
- `updated_at` columns are automatically updated on row modification

### Constraints

- **UNIQUE** constraints prevent duplicates
- **FOREIGN KEY** constraints ensure referential integrity
- **CHECK** constraints validate data (e.g., ratings 1-5)

## Sample Data

### Test User

A test user is automatically created during development:

- **Email:** test@example.com
- **Password:** password123

⚠️ **Remove this user in production!**

### Park Data

All parks from `parks.json` are automatically loaded into the database.

## Database Operations

### Service Layer

The database service (`src/db/database.ts`) provides:

- **User Operations:** Create, read, update, authenticate
- **Park Operations:** CRUD, region queries
- **Favorites:** Add, remove, list, check
- **Reviews:** Create, update, delete, aggregate
- **Search History:** Track user searches

### Transactions

Use the `transaction()` helper for multi-step operations:

```typescript
import { transaction } from './db/database.js';

await transaction(async (client) => {
  // Multiple operations
  await client.query('INSERT INTO ...');
  await client.query('UPDATE ...');
});
```

## Development vs Production

### Development

- Database auto-initializes on server start
- Schema is created automatically
- Sample data is loaded
- Test user is created

### Production

**Database Creation:**
```bash
# Create production database
createdb weekendwheresg_prod

# Run migrations manually (if needed)
psql -d weekendwheresg_prod -f src/db/schema.sql
```

**Environment Variables:**
```bash
DATABASE_HOST=your-production-host
DATABASE_PORT=5432
DATABASE_NAME=weekendwheresg_prod
DATABASE_USER=production_user
DATABASE_PASSWORD=strong-unique-password
DATABASE_SSL=true
```

**Security:**
- ✅ Use strong, unique passwords
- ✅ Enable SSL connections
- ✅ Restrict database user permissions
- ✅ Remove test user before deployment
- ✅ Regular backups

## Backup and Restore

### Backup

```bash
# Backup entire database
pg_dump -U postgres weekendwheresg > backup.sql

# Backup schema only
pg_dump -U postgres --schema-only weekendwheresg > schema.sql

# Backup data only
pg_dump -U postgres --data-only weekendwheresg > data.sql
```

### Restore

```bash
# Restore from backup
psql -U postgres weekendwheresg < backup.sql

# Or create a new database from backup
createdb weekendwheresg_new
psql -U postgres weekendwheresg_new < backup.sql
```

## Troubleshooting

### "Connection refused"

**Solution:**
1. Check PostgreSQL is running: `brew services list` (macOS) or `sudo service postgresql status` (Linux)
2. Verify credentials in `.env`
3. Check PostgreSQL is accepting connections

### "Database does not exist"

**Solution:**
```bash
# Create the database
createdb weekendwheresg

# Or use the setup script
cd apps/api && ./scripts/setup-db.sh
```

### "Permission denied"

**Solution:**
1. Check database user permissions
2. Verify password in `.env`
3. Ensure user has CONNECT and CREATE privileges

### "Schema already exists"

**Solution:**
This is normal - the schema uses `CREATE IF NOT EXISTS` statements.

### "Test user already exists"

**Solution:**
This is expected - the test user creation uses `ON CONFLICT DO NOTHING`.

## Performance

### Connection Pooling

The database uses connection pooling:
- **Max connections:** 20
- **Idle timeout:** 30 seconds
- **Connection timeout:** 2 seconds

### Query Optimization

- All foreign keys are indexed
- Location queries use GiST indexes
- JSONB columns are indexed for common queries

## Monitoring

### Query Logging

All queries are logged in development with execution time.

### Connection Monitoring

Check active connections:
```sql
SELECT * FROM pg_stat_activity WHERE datname = 'weekendwheresg';
```

## Migration Strategy

### Future Migrations

For schema changes:

1. Create migration file: `migrations/YYYY-MM-DD-description.sql`
2. Run migration: `psql -d weekendwheresg -f migrations/file.sql`
3. Test thoroughly before production

### Rollback

Keep rollback scripts in `migrations/rollback/` directory.

## Need Help?

For database issues:

1. Check PostgreSQL is running
2. Verify `.env` credentials
3. Check database exists: `psql -U postgres -l`
4. Review logs for specific errors
5. Try the setup script again

## Related Documentation

- [Environment Setup](./SETUP.md) - Environment variables
- [API Documentation](../README.md) - API endpoints
- [Development Guide](../README.md) - Development workflow
