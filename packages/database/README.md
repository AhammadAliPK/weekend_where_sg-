# @weekend-where-sg/database

Database package for WeekendWhere SG application. Provides PostgreSQL database connection, schema management, and data access layer.

## Features

- ✅ **Connection Management** - PostgreSQL connection pool with lazy initialization
- ✅ **Schema Management** - Automatic schema initialization and migrations
- ✅ **Data Access Layer** - Clean API for users, parks, favorites, reviews, search history
- ✅ **Type Safety** - Full TypeScript support with exported types
- ✅ **Transaction Support** - Multi-operation transaction helpers
- ✅ **Development Seeding** - Automatic park data loading

## Installation

This package is part of the WeekendWhere SG monorepo and is installed via workspace protocol:

```bash
# In the monorepo root
pnpm install
```

## Usage

### In API Application

```typescript
import { initializeDatabase, getParkById, createUser } from '@weekend-where-sg/database';

// Initialize database (development only)
await initializeDatabase();

// Use database functions
const park = await getParkById('east-coast-park');
const user = await createUser('user@example.com', 'password', 'John');
```

### Available Functions

#### Connection Management
- `testConnection()` - Test database connection
- `query(text, params)` - Execute SQL query
- `getClient()` - Get client for transactions
- `closePool()` - Close all connections

#### User Operations
- `createUser(email, password, name)` - Create new user
- `getUserByEmail(email)` - Get user by email
- `getUserById(userId)` - Get user by ID
- `verifyPassword(userId, password)` - Verify user password
- `updateLastLogin(userId)` - Update last login timestamp
- `updateUserPreferences(userId, preferences)` - Update user preferences

#### Park Operations
- `getParkById(parkId)` - Get park by ID
- `getParksByRegion(region)` - Get parks by region
- `getAllParks()` - Get all parks
- `upsertPark(parkData)` - Create or update park

#### Favorites
- `addFavorite(userId, parkId)` - Add to favorites
- `removeFavorite(userId, parkId)` - Remove from favorites
- `getUserFavorites(userId)` - Get user's favorites
- `isFavorite(userId, parkId)` - Check if favorited

#### Reviews
- `createReview(userId, parkId, rating, reviewText)` - Create review
- `updateReview(reviewId, rating, reviewText)` - Update review
- `deleteReview(reviewId)` - Delete review
- `getParkReviews(parkId)` - Get park reviews
- `getParkRating(parkId)` - Get park rating summary
- `getUserReviews(userId)` - Get user's reviews

#### Search History
- `addSearchHistory(userId, region, activity, preference)` - Add search to history
- `getSearchHistory(userId, limit)` - Get user's search history

#### Database Initialization
- `initializeSchema()` - Initialize database schema
- `seedDevelopmentData()` - Seed development data
- `initializeDatabase()` - Complete initialization

## Database Schema

### Tables
- **users** - User accounts with preferences
- **parks** - Park information with facilities, MRT, accessibility
- **favorites** - User favorite parks
- **reviews** - User ratings and reviews (1-5 stars)
- **search_history** - User search tracking

### Views
- **park_ratings** - Aggregated ratings per park
- **park_popularity** - Favorite counts per park
- **user_stats** - User statistics

## Environment Variables

Required for database connection:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=weekendwheresg
DATABASE_USER=postgres
DATABASE_PASSWORD=your-password
DATABASE_SSL=false
```

## Development

### Watch Mode
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Run Migrations
```bash
# From API package
pnpm db:migrate
```

## Testing

```bash
pnpm test
pnpm test:ui
```

## Database Migrations

Migrations are managed from the API package:

```bash
cd apps/api
pnpm db:migrate      # Full migration
pnpm db:schema      # Schema only
pnpm db:seed        # Seed data
pnpm db:reset       # Reset database
```

## Type Safety

All functions are fully typed. Types are exported from `@weekend-where-sg/types`:

```typescript
import type { User, Park, Favorite, Review } from '@weekend-where-sg/database';
```

## License

MIT
