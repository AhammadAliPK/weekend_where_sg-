# PostgreSQL Setup Instructions for WeekendWhere SG

## Quick Setup Guide

Since we encountered a password authentication issue, let's set up PostgreSQL properly:

### Option 1: Update PostgreSQL Password (Recommended)

1. **Set a password for the postgres user:**

```bash
# Start PostgreSQL service (macOS)
brew services start postgresql@15

# Connect to PostgreSQL as default user
psql postgres

# Inside psql, set password for postgres user
ALTER USER postgres PASSWORD 'postgres';
\q
```

2. **Update your `.env` file:**
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=weekendwheresg
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_SSL=false
```

3. **Create the database:**
```bash
cd apps/api
node scripts/create-db.js
```

### Option 2: Use Your Current macOS User

If you want to use your macOS user for PostgreSQL:

1. **Check your current username:**
```bash
whoami
```

2. **Update `.env` to use your username:**
```bash
DATABASE_USER=your-macos-username
DATABASE_PASSWORD=""  # Empty for peer authentication
```

3. **Create database using your user:**
```bash
# The script will now use your credentials
node scripts/create-db.js
```

### Option 3: Create a Dedicated Database User

For better security:

1. **Create a new user:**
```bash
psql postgres

# Inside psql
CREATE USER weekendwheresg WITH PASSWORD 'secure-password';
CREATE DATABASE weekendwheresg OWNER weekendwheresg;
GRANT ALL PRIVILEGES ON DATABASE weekendwheresg TO weekendwheresg;
\q
```

2. **Update `.env`:**
```bash
DATABASE_USER=weekendwheresg
DATABASE_PASSWORD=secure-password
```

## Testing Connection

After setting up, test the connection:

```bash
cd apps/api
node scripts/create-db.js
```

Expected output:
```
🔗 Connecting to PostgreSQL...
✅ Connected successfully
📦 Creating database 'weekendwheresg'...
✅ Database 'weekendwheresg' created successfully

🎉 Database setup complete!
```

## Troubleshooting

### "password authentication failed"

**Solution 1:** Reset postgres password
```bash
psql postgres
ALTER USER postgres PASSWORD 'your-password';
\q
```

**Solution 2:** Check pg_hba.conf (advanced)
```bash
# Find pg_hba.conf
pg_config --sysconfdir

# Edit to allow password authentication
# Change: local   all             postgres                                peer
# To:      local   all             postgres                                md5
```

### "Connection refused"

**Solution:** Ensure PostgreSQL is running
```bash
brew services list
brew services start postgresql@15
```

### "psql: command not found"

**Solution:** Install PostgreSQL client tools
```bash
brew install postgresql
```

## Next Steps

Once the database is created:

1. **Start the API server:**
```bash
cd apps/api
pnpm dev
```

2. **Expected output:**
```
✅ Database connection successful: 2026-06-28T...
🔧 Initializing database schema...
✅ Database schema initialized successfully
🌱 Seeding development data...
📦 Loading 15 parks into database...
✅ Development data seeded successfully
🎉 Database initialization complete
🚀 WeekendWhere SG API server running on http://localhost:3000
```

## Production Database

For production, you'll want:

1. **Use a managed PostgreSQL service:**
   - AWS RDS
   - Google Cloud SQL
   - Heroku Postgres
   - Railway

2. **Update production environment variables:**
   - Strong, unique password
   - SSL enabled
   - Restricted IP access

3. **Regular backups:**
   - Automated daily backups
   - Point-in-time recovery enabled

---

**Choose Option 1, 2, or 3 above and let me know which you'd like to use!**
