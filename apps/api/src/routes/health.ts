import { Router, Request, Response } from 'express';
import type { HealthResponse } from '../types/api.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	const healthResponse: HealthResponse = {
		ok: true,
		app: 'WeekendWhere SG',
		version: '1.0.0',
		timestamp: new Date().toISOString()
	};

	res.json(healthResponse);
});

export default router;
