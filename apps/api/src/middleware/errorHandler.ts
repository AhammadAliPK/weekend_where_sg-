import { Request, Response, NextFunction } from 'express';
import type { ErrorResponse } from '../types/api.js';

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void {
	console.error('Error:', err);

	const errorResponse: ErrorResponse = {
		success: false,
		error: 'INTERNAL_SERVER_ERROR',
		message: err.message || 'An unexpected error occurred',
		timestamp: new Date().toISOString()
	};

	res.status(500).json(errorResponse);
}

export function notFoundHandler(req: Request, res: Response): void {
	const errorResponse: ErrorResponse = {
		success: false,
		error: 'NOT_FOUND',
		message: `Route ${req.method} ${req.path} not found`,
		timestamp: new Date().toISOString()
	};

	res.status(404).json(errorResponse);
}
