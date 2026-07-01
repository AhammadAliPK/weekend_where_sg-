// Data loading utilities for WeekendWhere SG with graceful error handling
// Part of Phase 5: Error Handling

import type { Park } from '@weekend-where-sg/types';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

// Load JSON data synchronously (works with both esbuild and Railway)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try different path resolutions for different environments
const possiblePaths = [
	join(__dirname, '../../data/parks.json'),        // From dist/utils to dist/data
	join(__dirname, '../data/parks.json'),          // From dist to dist/data
	join(__dirname, 'data/parks.json'),            // Direct path
	join(process.cwd(), 'dist/data/parks.json'),   // Railway: from root to dist/data
	join(process.cwd(), 'apps/api/src/data/parks.json'), // Development
	join(process.cwd(), 'apps/api/dist/data/parks.json'), // Alternative Railway
	join(process.cwd(), 'src/data/parks.json')     // Alternative development
];

let parksData: Park[] = [];
let loadedPath = '';

for (const path of possiblePaths) {
	if (existsSync(path)) {
		try {
			const rawData = readFileSync(path, 'utf-8');
			parksData = JSON.parse(rawData);
			loadedPath = path;
			break;
		} catch (error) {
			console.error(`Failed to load parks data from ${path}:`, error);
		}
	}
}

if (parksData.length === 0) {
	console.error('Could not load parks data from any path:', possiblePaths);
}

/**
 * Load parks data from JSON file with graceful error handling
 *
 * @returns Array of parks
 * @throws Error if data fails to load
 */
export function loadParksData(): Park[] {
	try {
		// Validate data structure
		if (!Array.isArray(parksData)) {
			throw new Error('Parks data is not an array');
		}

		// Validate each park has required fields
		parksData.forEach((park: any, index: number) => {
			if (!park.id || !park.name || !park.region) {
				throw new Error(`Park at index ${index} missing required fields`);
			}
		});

		return parksData as Park[];
	} catch (error) {
		console.error('Failed to load parks data:', error);
		throw error;
	}
}

/**
 * Load parks data with fallback mechanism for external data sources
 * This function demonstrates graceful error handling pattern
 *
 * @param useExternalSource - Whether to try external data source first
 * @returns Object with parks data and source information
 */
export function loadParksDataWithFallback(useExternalSource = false): {
	parks: Park[];
	source: 'fallback data' | 'external API' | 'hybrid';
	error?: string;
} {
	// Try external source first if requested
	if (useExternalSource) {
		try {
			// Simulate external API call
			const externalParks = fetchExternalParksData();
			console.log('✅ Using external data source');
			return {
				parks: externalParks,
				source: 'external API'
			};
		} catch (externalError) {
			console.warn('⚠️ External data source failed, using fallback:', externalError);
			// Fall through to fallback data
		}
	}

	// Always have fallback data available
	try {
		const fallbackParks = loadParksData();
		console.log('✅ Using fallback data source');
		return {
			parks: fallbackParks,
			source: 'fallback data'
		};
	} catch (fallbackError) {
		// This should never happen since our fallback is local JSON
		const errorMessage = fallbackError instanceof Error ? fallbackError.message : 'Unknown error';
		console.error('❌ Critical: Even fallback data failed:', errorMessage);

		// Return empty array as last resort to prevent app crash
		return {
			parks: [],
			source: 'fallback data',
			error: errorMessage
		};
	}
}

/**
 * Simulate fetching parks data from external API
 * This demonstrates the pattern for external data integration
 *
 * @returns Array of parks from external source
 * @throws Error if external API fails
 */
function fetchExternalParksData(): Park[] {
	// Simulate external API call that might fail
	// In production, this would be a real API call

	const shouldFail = Math.random() < 0.3; // 30% chance of failure for demonstration

	if (shouldFail) {
		throw new Error('External API timeout or network error');
	}

	// Return fallback data as if it came from external source
	return loadParksData();
}

/**
 * Get parks by region with error handling
 *
 * @param region - Singapore region to filter by
 * @returns Array of parks in the specified region
 */
export function getParksByRegion(region: string): Park[] {
	try {
		const { parks } = loadParksDataWithFallback(false);
		return parks.filter(park => park.region === region);
	} catch (error) {
		console.error(`Failed to get parks for region ${region}:`, error);
		return []; // Return empty array on error
	}
}

/**
 * Get park by ID with error handling
 *
 * @param id - Park ID to search for
 * @returns Park if found, undefined otherwise
 */
export function getParkById(id: string): Park | undefined {
	try {
		const { parks } = loadParksDataWithFallback(false);
		return parks.find(park => park.id === id);
	} catch (error) {
		console.error(`Failed to get park ${id}:`, error);
		return undefined;
	}
}

/**
 * Get all unique regions from parks data with error handling
 *
 * @returns Array of unique region names
 */
export function getUniqueRegions(): string[] {
	try {
		const { parks } = loadParksDataWithFallback(false);
		const regions = new Set(parks.map(park => park.region));
		return Array.from(regions).sort();
	} catch (error) {
		console.error('Failed to get unique regions:', error);
		return ['Central', 'East', 'West', 'North', 'South']; // Return default regions
	}
}
