#!/bin/bash

# WeekendWhere SG - Database Setup Script
# This script helps set up the PostgreSQL database for development

set -e

echo "🐘 WeekendWhere SG - Database Setup"
echo "====================================="
echo ""

# Database configuration from environment
DB_NAME=${DATABASE_NAME:-weekendwheresg}
DB_USER=${DATABASE_USER:-postgres}
DB_HOST=${DATABASE_HOST:-localhost}
DB_PORT=${DATABASE_PORT:-5432}

echo "Database Configuration:"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo ""

# Check if PostgreSQL is running
echo "🔍 Checking if PostgreSQL is running..."
if ! command -v psql &> /dev/null; then
    echo "⚠️  psql command not found. Please install PostgreSQL client tools."
    echo "   On macOS: brew install postgresql"
    echo "   On Ubuntu: sudo apt-get install postgresql-client"
    exit 1
fi

# Test connection
echo "🔗 Testing database connection..."
if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "SELECT 1;" &> /dev/null; then
    echo "✅ Successfully connected to PostgreSQL"
else
    echo "❌ Failed to connect to PostgreSQL"
    echo "   Please check:"
    echo "   1. PostgreSQL is running"
    echo "   2. Credentials are correct"
    echo "   3. PostgreSQL accepts connections"
    exit 1
fi

# Check if database exists
echo "📂 Checking if database '$DB_NAME' exists..."
if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt | cut -d \| -f 1 | grep -w "$DB_NAME" | grep -v "template" | grep -v "postgres" > /dev/null; then
    echo "ℹ️  Database '$DB_NAME' already exists"
    read -p "Do you want to reset it? This will delete all data! (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🗑️  Dropping existing database..."
        psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "DROP DATABASE $DB_NAME;"
    else
        echo "✅ Using existing database"
        exit 0
    fi
fi

# Create database
echo "📦 Creating database '$DB_NAME'..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "CREATE DATABASE $DB_NAME;"
echo "✅ Database created successfully"

echo ""
echo "🎉 Database setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update your .env file with database credentials"
echo "  2. Run 'pnpm dev' to start the API server"
echo "  3. The server will automatically initialize the schema"
echo ""
echo "💡 The server will:"
echo "   • Create all required tables"
echo "   • Set up indexes and views"
echo "   • Load sample park data"
echo "   • Create a test user (test@example.com / password123)"
