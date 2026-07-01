/**
 * Database Service Layer
 * Provides high-level API for common database operations
 */

import { query, getClient } from './connection.js';
import bcrypt from 'bcrypt';

// =====================================================
// USER OPERATIONS
// =====================================================

/**
 * Create a new user
 */
export async function createUser(email: string, password: string, name?: string) {
	const passwordHash = await bcrypt.hash(password, 10);
	const result = await query(
		'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
		[email, passwordHash, name || null]
	);
	return result.rows[0];
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
	const result = await query('SELECT * FROM users WHERE email = $1 AND is_active = true', [email]);
	return result.rows[0] || null;
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string) {
	const result = await query(
		'SELECT id, email, name, preferences, created_at, last_login FROM users WHERE id = $1 AND is_active = true',
		[userId]
	);
	return result.rows[0] || null;
}

/**
 * Verify user password
 */
export async function verifyPassword(userId: string, password: string): Promise<boolean> {
	const result = await query('SELECT password_hash FROM users WHERE id = $1', [userId]);
	if (!result.rows[0]) return false;

	return await bcrypt.compare(password, result.rows[0].password_hash);
}

/**
 * Update user last login
 */
export async function updateLastLogin(userId: string): Promise<void> {
	await query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [userId]);
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(userId: string, preferences: Record<string, any>) {
	const result = await query(
		'UPDATE users SET preferences = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING preferences',
		[JSON.stringify(preferences), userId]
	);
	return result.rows[0].preferences;
}

// =====================================================
// PARK OPERATIONS
// =====================================================

/**
 * Get park by ID
 */
export async function getParkById(parkId: string) {
	const result = await query('SELECT * FROM parks WHERE id = $1', [parkId]);
	return result.rows[0] || null;
}

/**
 * Get parks by region
 */
export async function getParksByRegion(region: string) {
	const result = await query('SELECT * FROM parks WHERE region = $1 ORDER BY name', [region]);
	return result.rows;
}

/**
 * Get all parks
 */
export async function getAllParks() {
	const result = await query('SELECT * FROM parks ORDER BY region, name');
	return result.rows;
}

/**
 * Create or update park
 */
export async function upsertPark(parkData: any) {
	const {
		id,
		name,
		region,
		description,
		signals,
		opening_hours,
		facilities,
		accessibility,
		crowd_level,
		mrt_stations,
		latitude,
		longitude,
		address
	} = parkData;

	const result = await query(`
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
		RETURNING *
	`, [
		id, name, region, description,
		JSON.stringify(signals || {}),
		JSON.stringify(opening_hours || {}),
		JSON.stringify(facilities || {}),
		JSON.stringify(accessibility || {}),
		JSON.stringify(crowd_level || {}),
		JSON.stringify(mrt_stations || []),
		latitude || null,
		longitude || null,
		address || null
	]);

	return result.rows[0];
}

// =====================================================
// FAVORITES OPERATIONS
// =====================================================

/**
 * Add park to user favorites
 */
export async function addFavorite(userId: string, parkId: string) {
	const result = await query(
		'INSERT INTO favorites (user_id, park_id) VALUES ($1, $2) RETURNING *',
		[userId, parkId]
	);
	return result.rows[0];
}

/**
 * Remove park from user favorites
 */
export async function removeFavorite(userId: string, parkId: string): Promise<boolean> {
	const result = await query(
		'DELETE FROM favorites WHERE user_id = $1 AND park_id = $2 RETURNING id',
		[userId, parkId]
	);
	return result.rows.length > 0;
}

/**
 * Get user's favorite parks
 */
export async function getUserFavorites(userId: string) {
	const result = await query(`
		SELECT f.*, p.name, p.region, p.description, p.signals
		FROM favorites f
		JOIN parks p ON f.park_id = p.id
		WHERE f.user_id = $1
		ORDER BY f.created_at DESC
	`, [userId]);
	return result.rows;
}

/**
 * Check if park is in user favorites
 */
export async function isFavorite(userId: string, parkId: string): Promise<boolean> {
	const result = await query(
		'SELECT 1 FROM favorites WHERE user_id = $1 AND park_id = $2',
		[userId, parkId]
	);
	return result.rows.length > 0;
}

// =====================================================
// REVIEWS OPERATIONS
// =====================================================

/**
 * Create a review
 */
export async function createReview(userId: string, parkId: string, rating: number, reviewText?: string) {
	const result = await query(
		'INSERT INTO reviews (user_id, park_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *',
		[userId, parkId, rating, reviewText || null]
	);
	return result.rows[0];
}

/**
 * Update a review
 */
export async function updateReview(reviewId: string, rating: number, reviewText?: string) {
	const result = await query(
		'UPDATE reviews SET rating = $1, review_text = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
		[rating, reviewText || null, reviewId]
	);
	return result.rows[0];
}

/**
 * Delete a review
 */
export async function deleteReview(reviewId: string): Promise<boolean> {
	const result = await query('DELETE FROM reviews WHERE id = $1 RETURNING id', [reviewId]);
	return result.rows.length > 0;
}

/**
 * Get reviews for a park
 */
export async function getParkReviews(parkId: string) {
	const result = await query(`
		SELECT r.*, u.name as user_name
		FROM reviews r
		JOIN users u ON r.user_id = u.id
		WHERE r.park_id = $1
		ORDER BY r.created_at DESC
	`, [parkId]);
	return result.rows;
}

/**
 * Get park rating summary
 */
export async function getParkRating(parkId: string) {
	const result = await query(`
		SELECT
			COUNT(*) as review_count,
			AVG(rating) as average_rating,
			MAX(rating) as highest_rating,
			MIN(rating) as lowest_rating
		FROM reviews
		WHERE park_id = $1
	`, [parkId]);
	return result.rows[0] || { review_count: 0, average_rating: 0, highest_rating: 0, lowest_rating: 0 };
}

/**
 * Get user's reviews
 */
export async function getUserReviews(userId: string) {
	const result = await query(`
		SELECT r.*, p.name as park_name, p.region
		FROM reviews r
		JOIN parks p ON r.park_id = p.id
		WHERE r.user_id = $1
		ORDER BY r.created_at DESC
	`, [userId]);
	return result.rows;
}

// =====================================================
// SEARCH HISTORY OPERATIONS
// =====================================================

/**
 * Add search to history
 */
export async function addSearchHistory(userId: string, region: string, activity: string, preference: string) {
	const result = await query(
		'INSERT INTO search_history (user_id, region, activity, preference) VALUES ($1, $2, $3, $4) RETURNING *',
		[userId, region, activity, preference]
	);
	return result.rows[0];
}

/**
 * Get user's search history
 */
export async function getSearchHistory(userId: string, limit: number = 10) {
	const result = await query(`
		SELECT * FROM search_history
		WHERE user_id = $1
		ORDER BY searched_at DESC
		LIMIT $2
	`, [userId, limit]);
	return result.rows;
}

// =====================================================
// TRANSACTION HELPERS
// =====================================================

/**
 * Execute multiple operations in a transaction
 */
export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
	const client = await getClient();

	try {
		await client.query('BEGIN');
		const result = await callback(client);
		await client.query('COMMIT');
		return result;
	} catch (error) {
		await client.query('ROLLBACK');
		throw error;
	} finally {
		client.release();
	}
}