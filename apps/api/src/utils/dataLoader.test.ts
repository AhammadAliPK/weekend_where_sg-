// Data loader tests
// Test fallback park data loading functionality
// Part of Phase 4: API Integration

import { describe, it, expect } from 'vitest';
import { loadParksData, getParksByRegion, getParkById, getUniqueRegions } from './dataLoader.js';

describe('Data Loader', () => {
	describe('loadParksData', () => {
		it('should load parks data successfully', () => {
			const parks = loadParksData();

			expect(Array.isArray(parks)).toBe(true);
			expect(parks.length).toBeGreaterThan(0);
			expect(parks.length).toBeLessThanOrEqual(15);
		});

		it('should load within 500ms requirement', () => {
			const startTime = Date.now();
			const parks = loadParksData();
			const endTime = Date.now();

			const loadTime = endTime - startTime;

			expect(parks).toBeDefined();
			expect(loadTime).toBeLessThan(500);
			console.log(`Data loaded in ${loadTime}ms`);
		});

		it('should contain parks with required fields', () => {
			const parks = loadParksData();

			parks.forEach(park => {
				expect(park).toHaveProperty('id');
				expect(park).toHaveProperty('name');
				expect(park).toHaveProperty('region');
				expect(park).toHaveProperty('activities');
				expect(park).toHaveProperty('amenities');
				expect(park).toHaveProperty('description');
				expect(park).toHaveProperty('signals');
			});
		});

		it('should contain parks from all five Singapore regions', () => {
			const parks = loadParksData();
			const regions = new Set(parks.map(park => park.region));

			expect(regions.has('Central')).toBe(true);
			expect(regions.has('East')).toBe(true);
			expect(regions.has('West')).toBe(true);
			expect(regions.has('North')).toBe(true);
			expect(regions.has('South')).toBe(true);
		});

		it('should include recognizable Singapore locations', () => {
			const parks = loadParksData();
			const parkNames = parks.map(park => park.name);

			expect(parkNames).toContain('East Coast Park');
			expect(parkNames).toContain('Singapore Botanic Gardens');
			expect(parkNames).toContain('West Coast Park');
		});

		it('should have varied signals across parks', () => {
			const parks = loadParksData();

			// Check that parks have different signal strengths
			const cyclingSignals = parks.map(park => typeof park.signals?.cycling === 'number' ? park.signals.cycling : 0);
			const natureSignals = parks.map(park => typeof park.signals?.nature === 'number' ? park.signals.nature : 0);

			// Should have variety in signal strengths
			expect(Math.max(...cyclingSignals)).toBeGreaterThan(0);
			expect(Math.max(...natureSignals)).toBeGreaterThan(0);
		});
	});

	describe('getParksByRegion', () => {
		it('should filter parks by region correctly', () => {
			const centralParks = getParksByRegion('Central');

			expect(centralParks.length).toBeGreaterThan(0);
			centralParks.forEach(park => {
				expect(park.region).toBe('Central');
			});
		});

		it('should return empty array for unknown region', () => {
			const unknownParks = getParksByRegion('Unknown');

			expect(unknownParks).toEqual([]);
		});
	});

	describe('getParkById', () => {
		it('should find park by valid ID', () => {
			const park = getParkById('park-001');

			expect(park).toBeDefined();
			expect(park?.id).toBe('park-001');
			expect(park?.name).toBe('East Coast Park');
		});

		it('should return undefined for invalid ID', () => {
			const park = getParkById('invalid-id');

			expect(park).toBeUndefined();
		});
	});

	describe('getUniqueRegions', () => {
		it('should return all unique regions', () => {
			const regions = getUniqueRegions();

			expect(regions).toHaveLength(5);
			expect(regions).toContain('Central');
			expect(regions).toContain('East');
			expect(regions).toContain('West');
			expect(regions).toContain('North');
			expect(regions).toContain('South');
		});
	});
});
