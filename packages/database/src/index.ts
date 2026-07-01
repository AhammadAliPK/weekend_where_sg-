/**
 * WeekendWhere SG - Database Package
 * Provides database connection, schema management, and data access layer
 *
 * @package @weekend-where-sg/database
 */

// Import types from @weekend-where-sg/types first
import type { Park, Recommendation } from '@weekend-where-sg/types';

// Export connection utilities
export { pool, testConnection, query, getClient, closePool } from './connection.js';

// Export database service layer
export {
	createUser,
	getUserByEmail,
	getUserById,
	verifyPassword,
	updateLastLogin,
	updateUserPreferences
} from './database.js';

// Export specific operation groups
export {
	getParkById,
	getParksByRegion,
	getAllParks,
	upsertPark
} from './database.js';

export {
	addFavorite,
	removeFavorite,
	getUserFavorites,
	isFavorite
} from './database.js';

export {
	createReview,
	updateReview,
	deleteReview,
	getParkReviews,
	getParkRating,
	getUserReviews
} from './database.js';

export {
	addSearchHistory,
	getSearchHistory
} from './database.js';

export {
	transaction
} from './database.js';

// Export initialization functions
export {
	initializeSchema,
	seedDevelopmentData,
	initializeDatabase
} from './init.js';

// Re-export types from @weekend-where-sg/types
export type { Park, Recommendation };

// Database-specific types
export interface User {
	id: string;
	email: string;
	name: string | null;
	password_hash: string;
	preferences: Record<string, any>;
	is_active: boolean;
	created_at: Date;
	updated_at: Date;
	last_login: Date | null;
}

export interface Favorite {
	id: string;
	user_id: string;
	park_id: string;
	created_at: Date;
}

export interface Review {
	id: string;
	user_id: string;
	park_id: string;
	rating: number;
	review_text: string | null;
	created_at: Date;
	updated_at: Date;
}

export interface SearchHistory {
	id: string;
	user_id: string;
	region: string;
	activity: string;
	preference: string;
	searched_at: Date;
}

export interface ParkWithDetails extends Park {
	id?: string;
	opening_hours?: Record<string, any>;
	facilities?: string[];
	accessibility?: Record<string, any>;
	crowd_level?: Record<string, any>;
	mrt_stations?: string[];
	latitude?: number;
	longitude?: number;
	address?: string;
}