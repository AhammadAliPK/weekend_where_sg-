# PostgreSQL Database Setup - Quick Start

You've got great default credentials in `.env.example`:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=weekendwheresg
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
```

## Quick Setup (2 Steps)

### Step 1: Start PostgreSQL

**macOS:**
```bash
brew services start postgresql@15
# OR
brew services start postgresql
```

**Linux:**
```bash
sudo service postgresql start
```

**Verify it's running:**
```bash
psql --version
```

### Step 2: Create the Database

**Option A: Using psql (if available)**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE weekendwheresg;

# Exit
\q
```

**Option B: Using the Node script**
```bash
cd apps/api
node scripts/create-db.js
```

**Option C: Using createdb**
```bash
createdb weekendwheresg
```

## That's It!

Once the database is created, start the server:

```bash
cd apps/api
pnpm dev
```

The server will automatically:
- ✅ Connect to the database
- ✅ Initialize the schema
- ✅ Load 15 parks
- ✅ Create test user (test@example.com / password123)

## Troubleshooting

**"psql: command not found"**
- Install PostgreSQL client: `brew install postgresql`

**"password authentication failed"**
```bash
# Set the password to match .env
psql postgres
ALTER USER postgres PASSWORD 'postgres';
\q
```

**"connection refused"**
- Make sure PostgreSQL is running: `brew services list`

**"database already exists"**
- Perfect! Skip to starting the server.

## Alternative: Use DATABASE_URL

If you prefer a single connection string, add to `.env`:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/weekendwheresg
```

This overrides the individual DATABASE_* settings.

---

**Ready to start the server once you've created the database!** 🚀
