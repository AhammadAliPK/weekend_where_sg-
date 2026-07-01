/**
 * Government Parks API
 * Fetches park data from Singapore's data.gov.sg API
 */

import { Router } from 'express';
import { fetchParksFromGovAPI } from '../utils/govDataFetcher.js';

const router = Router();

/**
 * GET /api/parks/government
 * Fetch parks from Singapore government API
 *
 * Query params:
 * - datasetId: Optional dataset ID from data.gov.sg
 * - limit: Number of parks to return (default: 6)
 *
 * Examples:
 * GET /api/parks/government?limit=6
 * GET /api/parks/government?datasetId=d_123456&limit=20
 */
router.get('/', async (req, res) => {
	try {
		const { datasetId, limit = '6' } = req.query;

		console.log('🇸🇬 Fetching Singapore government park data...');
		console.log(`📊 Limit: ${limit} parks`);
		if (datasetId) console.log(`📡 Dataset: ${datasetId}`);

		// Fetch from government API
		const parks = await fetchParksFromGovAPI(datasetId as string);

		// Apply limit
		const limitedParks = parks.slice(0, parseInt(limit as string));

		res.json({
			success: true,
			source: 'Singapore Government API (data.gov.sg)',
			count: limitedParks.length,
			total: parks.length,
			parks: limitedParks,
			timestamp: new Date().toISOString()
		});

	} catch (error) {
		console.error('❌ Error fetching government parks:', error);
		res.status(500).json({
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error',
			message: 'Failed to fetch park data from government API'
		});
	}
});

export default router;
