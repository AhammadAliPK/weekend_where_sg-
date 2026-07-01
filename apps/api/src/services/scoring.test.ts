// Scoring Service Unit Tests
// Signal-based scoring implementation tests
// Part of Phase 3: Scoring Engine

import { describe, it, expect } from 'vitest';
import { scorePark, scoreParks, demonstrateSignalExtensibility } from './scoring.js';
import type { Park, UserPreferences, ParkSignals } from '@weekend-where-sg/types';

describe('Scoring Service - Signal-Based Implementation', () => {
	// Test data with signals
	const mockParkWithSignals: Park = {
		name: 'Test Park',
		region: 'Central',
		activities: ['Walking', 'Cycling', 'Nature'],
		amenities: ['Playground', 'Cycling track', 'Shelter'],
		description: 'A great park for testing',
		signals: {
			activity: 3,        // High activity variety
			family: 2,          // Good family facilities
			cycling: 2,         // Dedicated cycling tracks
			nature: 1,          // Some natural features
			fitness: 1,         // Basic fitness options
			route: 2,           // Good walking routes
			kidFriendly: 2      // Excellent kid-friendly features
		}
	};

	const mockParkWithoutSignals: Park = {
		name: 'Basic Park',
		region: 'East',
		activities: ['Walking'],
		amenities: ['Bench'],
		description: 'A basic park'
		// No signals object
	};

	const mockPreferences: UserPreferences = {
		region: 'Central',
		activity: 'Walking',
		preference: 'Balanced'
	};

	describe('signal-based scoring', () => {
		it('should use signals for preference-based scoring', () => {
			const result = scorePark(mockParkWithSignals, mockPreferences);

			// Should use activity and family signals for balanced preference
			expect(result.score).toBeGreaterThan(5); // Base score + bonuses
			expect(result.reasons.length).toBeGreaterThan(0);
		});

		it('should handle missing signals gracefully', () => {
			const preferences: UserPreferences = {
				region: 'East',
				activity: 'Walking',
				preference: 'Balanced'
			};

			const result = scorePark(mockParkWithoutSignals, preferences);

			// Should still work without signals, just base scoring
			expect(result.score).toBeGreaterThanOrEqual(5);
			expect(result).toHaveProperty('verdict');
			expect(result).toHaveProperty('reasons');
		});

		it('should interpret signal numbers correctly', () => {
			const highSignalPark: Park = {
				...mockParkWithSignals,
				signals: {
					cycling: 3, // High cycling signal
					route: 3    // High route signal
				}
			};

			const cyclingPreferences: UserPreferences = {
				region: 'East',
				activity: 'Cycling',
				preference: 'Cycling-friendly'
			};

			const result = scorePark(highSignalPark, cyclingPreferences);

			// High signals should result in higher scores
			expect(result.score).toBeGreaterThan(6);
		});

		it('should interpret signal booleans correctly', () => {
			const booleanSignalPark: Park = {
				...mockParkWithSignals,
				signals: {
					cycling: true, // Boolean signal
					route: false
				}
			};

			const cyclingPreferences: UserPreferences = {
				region: 'East',
				activity: 'Cycling',
				preference: 'Cycling-friendly'
			};

			const result = scorePark(booleanSignalPark, cyclingPreferences);

			// Boolean true should be treated as signal value 1
			expect(result.score).toBeGreaterThan(5);
		});
	});

	describe('signal extensibility', () => {
		it('should ignore unknown signals gracefully', () => {
			const parkWithFutureSignals: Park = {
				...mockParkWithSignals,
				signals: {
					...mockParkWithSignals.signals,
					// Future signals that don't exist yet
					wifi: 2,
					parking: 3,
					food: 1,
					nightMode: true
				}
			};

			const result = scorePark(parkWithFutureSignals, mockPreferences);

			// Should work without errors despite unknown signals
			expect(result.score).toBeGreaterThan(5);
			expect(result).toHaveProperty('verdict');
		});

		it('should demonstrate signal extensibility', () => {
			const extendedSignals = {
				activity: 2,
				family: 1,
				cycling: 3,
				nature: 2,
				fitness: 1,
				route: 2,
				kidFriendly: 1,
				// Future signals
				wifi: 3,
				parking: 2
			};

			const analysis = demonstrateSignalExtensibility(extendedSignals);

			expect(analysis.knownSignals).toHaveLength(7);
			expect(analysis.unknownSignals).toHaveLength(2);
			expect(analysis.unknownSignals).toContain('wifi');
			expect(analysis.unknownSignals).toContain('parking');
			expect(analysis.totalSignals).toBe(9);
		});

		it('should allow adding new signals without breaking existing scoring', () => {
			// Original park
			const originalResult = scorePark(mockParkWithSignals, mockPreferences);
			const originalScore = originalResult.score;

			// Same park with additional future signals
			const parkWithExtraSignals: Park = {
				...mockParkWithSignals,
				signals: {
					...mockParkWithSignals.signals,
					wifi: 5,
					parking: 3,
					food: 2
				}
			};

			const newResult = scorePark(parkWithExtraSignals, mockPreferences);

			// Score should remain the same (unknown signals ignored)
			expect(newResult.score).toBe(originalScore);
		});
	});

	describe('preference-specific signal scoring', () => {
		it('should award cycling preference using cycling signals', () => {
			const cyclingPreferences: UserPreferences = {
				region: 'East',
				activity: 'Cycling',
				preference: 'Cycling-friendly'
			};

			const result = scorePark(mockParkWithSignals, cyclingPreferences);
			expect(result.reasons.some(r => r.includes('cycling') || r.includes('Cycling'))).toBe(true);
		});

		it('should award kid-friendly preference using kid-friendly signals', () => {
			const kidPreferences: UserPreferences = {
				region: 'East',
				activity: 'Walking',
				preference: 'Kid-friendly'
			};

			const result = scorePark(mockParkWithSignals, kidPreferences);
			expect(result.reasons.some(r => r.includes('kid') || r.includes('family'))).toBe(true);
		});

		it('should award long walk preference using route signals', () => {
			const walkPreferences: UserPreferences = {
				region: 'East',
				activity: 'Walking',
				preference: 'Long walk'
			};

			const result = scorePark(mockParkWithSignals, walkPreferences);
			expect(result.reasons.some(r => r.includes('walk') || r.includes('trail') || r.includes('route'))).toBe(true);
		});

		it('should award weather-safe preference using route signals', () => {
			const weatherPreferences: UserPreferences = {
				region: 'East',
				activity: 'Walking',
				preference: 'Weather-safe'
			};

			const result = scorePark(mockParkWithSignals, weatherPreferences);
			expect(result.reasons.some(r => r.includes('weather') || r.includes('covered'))).toBe(true);
		});
	});

	describe('region-based scoring', () => {
		it('should award region match bonus (+3 points)', () => {
			const regionPreferences: UserPreferences = {
				region: 'Central',
				activity: 'Running',
				preference: 'Balanced'
			};

			const result = scorePark(mockParkWithSignals, regionPreferences);
			const baseResult = scorePark(mockParkWithSignals, { ...regionPreferences, region: 'East' });

			expect(result.score).toBe(baseResult.score + 3);
			expect(result.reasons).toContain('Matches selected region');
		});

		it('should be case-insensitive for region matching', () => {
			const caseTestPreferences: UserPreferences = {
				region: 'central', // lowercase
				activity: 'Walking',
				preference: 'Balanced'
			};

			const result = scorePark(mockParkWithSignals, caseTestPreferences);

			// Should match despite case difference
			expect(result.score).toBeGreaterThan(7); // Base 5 + region 3 + activity 1
			expect(result.reasons).toContain('Matches selected region');
		});

	describe('activity-based scoring with signals', () => {
		it('should award +3 points for cycling activity with strong cycling signal', () => {
			const cyclingPark: Park = {
				name: 'Cycling Park',
				region: 'East',
				activities: ['Cycling'],
				amenities: ['Cycling track'],
				signals: {
					cycling: 3 // Strong cycling signal
				}
			};

			const cyclingPreferences: UserPreferences = {
				region: 'East',
				activity: 'Cycling',
				preference: 'Balanced'
			};

			const result = scorePark(cyclingPark, cyclingPreferences);

			// Should get +3 points for strong cycling signal
			expect(result.reasons).toContain('Good for cycling');
			expect(result.score).toBeGreaterThan(7); // Base 5 + region 3 + cycling 3 = 11 capped to 10
		});

		it('should award +2 points for cycling activity with route signal', () => {
			const routePark: Park = {
				name: 'Route Park',
				region: 'East',
				activities: ['Walking'],
				amenities: ['Walking trail'],
				signals: {
					route: 2 // Route signal but no cycling signal
				}
			};

			const cyclingPreferences: UserPreferences = {
				region: 'East',
				activity: 'Cycling',
				preference: 'Balanced'
			};

			const result = scorePark(routePark, cyclingPreferences);

			// Should get +2 points for route signal
			expect(result.reasons).toContain('Has cycling-friendly routes');
		});

		it('should award +3 points for family activity with strong family signal', () => {
			const familyPark: Park = {
				name: 'Family Park',
				region: 'East',
				activities: ['Family outing'],
				amenities: ['Playground', 'Picnic area'],
				signals: {
					family: 3 // Strong family signal
				}
			};

			const familyPreferences: UserPreferences = {
				region: 'East',
				activity: 'Family outing',
				preference: 'Balanced'
			};

			const result = scorePark(familyPark, familyPreferences);

			// Should get +3 points for strong family signal
			expect(result.reasons).toContain('Perfect for family activities');
		});

		it('should award appropriate points for walking activity with route signals', () => {
			const walkingPark: Park = {
				name: 'Walking Park',
				region: 'East',
				activities: ['Walking'],
				amenities: ['Walking trail'],
				signals: {
					route: 3 // Strong route signal for walking
				}
			};

			const walkingPreferences: UserPreferences = {
				region: 'East',
				activity: 'Walking',
				preference: 'Balanced'
			};

			const result = scorePark(walkingPark, walkingPreferences);

			// Should get +3 points for strong route signal
			expect(result.reasons).toContain('Excellent for walking');
		});

		it('should award appropriate points for nature activity with nature signals', () => {
			const naturePark: Park = {
				name: 'Nature Park',
				region: 'East',
				activities: ['Nature'],
				amenities: ['Garden', 'Wildlife area'],
				signals: {
					nature: 3 // Strong nature signal
				}
			};

			const naturePreferences: UserPreferences = {
				region: 'East',
				activity: 'Nature',
				preference: 'Balanced'
			};

			const result = scorePark(naturePark, naturePreferences);

			// Should get +3 points for strong nature signal
			expect(result.reasons).toContain('Rich nature experience');
		});

		it('should award appropriate points for fitness activity with fitness signals', () => {
			const fitnessPark: Park = {
				name: 'Fitness Park',
				region: 'East',
				activities: ['Fitness'],
				amenities: ['Fitness equipment', 'Exercise station'],
				signals: {
					fitness: 3 // Strong fitness signal
				}
			};

			const fitnessPreferences: UserPreferences = {
				region: 'East',
				activity: 'Fitness',
				preference: 'Balanced'
			};

			const result = scorePark(fitnessPark, fitnessPreferences);

			// Should get +3 points for strong fitness signal
			expect(result.reasons).toContain('Excellent for fitness activities');
		});

		it('should fall back to generic activity bonus for unmapped activities', () => {
			const genericPark: Park = {
				name: 'Generic Park',
				region: 'East',
				activities: ['Photography'],
				amenities: ['Scenic viewpoint']
			};

			const photoPreferences: UserPreferences = {
				region: 'East',
				activity: 'Photography',
				preference: 'Balanced'
			};

			const result = scorePark(genericPark, photoPreferences);

			// Should get +1 point for activity match
			expect(result.reasons).toContain('Great for photography');
		});
	});

	describe('region-based scoring', () => {
		it('should give no bonus for non-matching regions', () => {
			const nonMatchingPreferences: UserPreferences = {
				region: 'West',
				activity: 'Walking',
				preference: 'Balanced'
			};

			const result = scorePark(mockParkWithSignals, nonMatchingPreferences);

			// Should not get region bonus (Base 5 + activity 3 + preference 2 = 10, capped at 10)
			expect(result.score).toBe(10);
			expect(result.reasons).not.toContain('Matches selected region');
		});
	});

	describe('backward compatibility', () => {
		it('should work with parks that have no signals object', () => {
			const preferences: UserPreferences = {
				region: 'East',
				activity: 'Walking',
				preference: 'Balanced'
			};

			const result = scorePark(mockParkWithoutSignals, preferences);

			// Should fall back to basic scoring
			expect(result.score).toBeGreaterThanOrEqual(5);
			expect(result).toHaveProperty('verdict');
		});

		it('should work with parks that have empty signals object', () => {
			const parkWithEmptySignals: Park = {
				...mockParkWithoutSignals,
				signals: {}
			};

			const preferences: UserPreferences = {
				region: 'East',
				activity: 'Walking',
				preference: 'Balanced'
			};

			const result = scorePark(parkWithEmptySignals, preferences);

			// Should still work
			expect(result.score).toBeGreaterThanOrEqual(5);
		});
	});
});
});
