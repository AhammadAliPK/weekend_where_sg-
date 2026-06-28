import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import recommendationsRouter from './routes/recommendations.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
	origin: process.env.FRONTEND_URL || 'http://localhost:5173',
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
	next();
});

// API Routes
app.use('/api/health', healthRouter);
app.use('/api/recommendations', recommendationsRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
	console.log(`🚀 WeekendWhere SG API server running on http://localhost:${PORT}`);
	console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
	console.log(`🌳 Recommendations: http://localhost:${PORT}/api/recommendations`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
	console.log('SIGTERM received, shutting down gracefully...');
	process.exit(0);
});

process.on('SIGINT', () => {
	console.log('SIGINT received, shutting down gracefully...');
	process.exit(0);
});

export default app;
