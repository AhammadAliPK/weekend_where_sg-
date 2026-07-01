-- WeekendWhere SG Database Schema
-- PostgreSQL schema for users, favorites, and reviews

-- Enable UUID extension for generating unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	email VARCHAR(255) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	name VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	last_login TIMESTAMP,
	is_active BOOLEAN DEFAULT true,

	-- User preferences (stored as JSONB for flexibility)
	preferences JSONB DEFAULT '{
		"favoriteRegions": [],
		"favoriteActivities": [],
		"favoritePreferences": []
	}'::jsonb
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- Index for active users
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active) WHERE is_active = true;

-- =====================================================
-- PARKS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS parks (
	id VARCHAR(255) PRIMARY KEY, -- Park ID from parks.json
	name VARCHAR(255) NOT NULL,
	region VARCHAR(100) NOT NULL,
	description TEXT,

	-- Park signals (stored as JSONB)
	signals JSONB DEFAULT '{}'::jsonb,

	-- Opening hours (stored as JSONB for flexibility)
	opening_hours JSONB DEFAULT '{}'::jsonb,

	-- Facilities (stored as JSONB)
	facilities JSONB DEFAULT '{
		"toilets": false,
		"food": false,
		"parking": false,
		"wheelchair": false,
		"water": false,
		"shelter": false
	}'::jsonb,

	-- Accessibility information
	accessibility JSONB DEFAULT '{}'::jsonb,

	-- Crowd level prediction
	crowd_level JSONB DEFAULT '{}'::jsonb,

	-- MRT stations (stored as JSONB)
	mrt_stations JSONB DEFAULT '[]'::jsonb,

	-- Location data
	latitude DECIMAL(9, 6),
	longitude DECIMAL(9, 6),
	address TEXT,

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for region queries
CREATE INDEX IF NOT EXISTS idx_parks_region ON parks(region);
-- Index for location-based queries
CREATE INDEX IF NOT EXISTS idx_parks_location ON parks USING GIST(
	point(longitude, latitude)
) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- =====================================================
-- USER FAVORITES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS favorites (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	park_id VARCHAR(255) NOT NULL REFERENCES parks(id) ON DELETE CASCADE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	-- Ensure a user can only favorite a park once
	UNIQUE(user_id, park_id)
);

-- Index for user's favorites
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
-- Index for park popularity (how many users favorited it)
CREATE INDEX IF NOT EXISTS idx_favorites_park_id ON favorites(park_id);

-- =====================================================
-- PARK REVIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	park_id VARCHAR(255) NOT NULL REFERENCES parks(id) ON DELETE CASCADE,
	rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
	review_text TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	-- Ensure a user can only review a park once
	UNIQUE(user_id, park_id)
);

-- Index for park reviews
CREATE INDEX IF NOT EXISTS idx_reviews_park_id ON reviews(park_id);
-- Index for user's reviews
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
-- Index for recent reviews
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);

-- =====================================================
-- USER SEARCH HISTORY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS search_history (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	region VARCHAR(100),
	activity VARCHAR(100),
	preference VARCHAR(100),
	searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for user's search history
CREATE INDEX IF NOT EXISTS idx_search_history_user ON search_history(user_id);
-- Index for recent searches
CREATE INDEX IF NOT EXISTS idx_search_history_time ON search_history(searched_at DESC);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = CURRENT_TIMESTAMP;
	RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
	FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_parks_updated_at ON parks;
CREATE TRIGGER update_parks_updated_at BEFORE UPDATE ON parks
	FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
	FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for park ratings (aggregated from reviews)
CREATE OR REPLACE VIEW park_ratings AS
SELECT
	park_id,
	COUNT(*) as review_count,
	AVG(rating) as average_rating,
	MAX(rating) as highest_rating,
	MIN(rating) as lowest_rating
FROM reviews
GROUP BY park_id;

-- View for park popularity (favorites count)
CREATE OR REPLACE VIEW park_popularity AS
SELECT
	park_id,
	COUNT(*) as favorite_count
FROM favorites
GROUP BY park_id;

-- View for user statistics
CREATE OR REPLACE VIEW user_stats AS
SELECT
	u.id as user_id,
	u.email,
	u.name,
	u.created_at,
	COUNT(DISTINCT f.id) as favorite_count,
	COUNT(DISTINCT r.id) as review_count
FROM users u
LEFT JOIN favorites f ON u.id = f.user_id
LEFT JOIN reviews r ON u.id = r.user_id
GROUP BY u.id, u.email, u.name, u.created_at;

-- =====================================================
-- SAMPLE DATA (for development)
-- =====================================================

-- Insert a test user (password: "password123" - CHANGE IN PRODUCTION)
-- This should be removed in production
INSERT INTO users (email, password_hash, name) VALUES
('test@example.com', '$2b$10$rKZOJZvN/zxNOQc9LY7FZO7T3KFWJYZIdUWWE5Z6mQxIZJqCqx5uS', 'Test User')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- GRANTS (adjust based on your security requirements)
-- =====================================================

-- Grant necessary permissions (adjust based on your database user)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO your_app_user;