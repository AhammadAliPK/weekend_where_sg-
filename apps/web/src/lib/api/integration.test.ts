// Frontend integration tests
// Test API client and store integration
// Part of Phase 5: Error Handling

import { describe, it, expect, beforeAll } from 'vitest';
import { fetchRecommendations, checkHealth } from '../lib/api/client';

describe('Frontend API Integration', () => {
	describe('API client', () => {
		it('should fetch recommendations successfully', async () => {
			const response = await fetchRecommendations({
				region: 'East',
				activity: 'Cycling',
				preference: 'Cycling-friendly',
				limit: 3
			});

			expect(response).toBeDefined();
			expect(response.source).toBe('WeekendWhere SG API');
			expect(response.region).toBe('East');
			expect(response.activity).toBe('Cycling');
			expect(response.preference).toBe('Cycling-friendly');
			expect(response.count).toBe(3);
			expect(response.recommendations).toBeDefined();
			expect(response.recommendations.length).toBe(3);
		});

		it('should include all recommendation fields', async () => {
			const response = await fetchRecommendations({
				region: 'Central',
				activity: 'Walking',
				preference: 'Balanced'
			});

			const firstRecommendation = response.recommendations[0];

			expect(firstRecommendation).toHaveProperty('id');
			expect(firstRecommendation).toHaveProperty('name');
			expect(firstRecommendation).toHaveProperty('region');
			expect(firstRecommendation).toHaveProperty('score');
			expect(firstRecommendation).toHaveProperty('verdict');
			expect(firstRecommendation).toHaveProperty('activityFit');
			expect(firstRecommendation).toHaveProperty('description');
			expect(firstRecommendation).toHaveProperty('reasons');
			expect(firstRecommendation).toHaveProperty('signals');
		});

		it('should handle errors gracefully', async () => {
			await expect(
				fetchRecommendations({
					region: 'Invalid',
					activity: 'Cycling',
					preference: 'Balanced'
				})
			).rejects.toThrow('Invalid or missing parameters');
		});

		it('should check health successfully', async () => {
			const health = await checkHealth();

			expect(health).toBeDefined();
			expect(health.ok).toBe(true);
			expect(health.app).toBe('WeekendWhere SG');
			expect(health.version).toBe('1.0.0');
		});
	});

	describe('API response structure', () => {
		it('should return recommendations sorted by score', async () => {
			const response = await fetchRecommendations({
				region: 'East',
				activity: 'Cycling',
				preference: 'Cycling-friendly'
			});

			const scores = response.recommendations.map(rec => rec.score);

			// Verify scores are in descending order
			for (let i = 0; i < scores.length - 1; i++) {
				expect(scores[i]).toBeGreaterThanOrEqual(scores[i + 1]);
			}
		});

		it('should limit results correctly', async () => {
			const response3 = await fetchRecommendations({
				region: 'Central',
				activity: 'Walking',
				preference: 'Balanced',
				limit: 3
			});

			const response6 = await fetchRecommendations({
				region: 'Central',
				activity: 'Walking',
				preference: 'Balanced',
				limit: 6
			});

			expect(response3.count).toBe(3);
			expect(response6.count).toBe(6);
		});
	});
});
