import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import recommendationsRouter from './routes/recommendations.js';
import governmentParksRouter from './routes/governmentParks.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { validateEnv, getEnvConfig, isDevelopment } from './utils/env.js';
import { initializeDatabase } from '@weekend-where-sg/database';

// Load environment variables
dotenv.config();

// Validate environment variables
try {
	validateEnv();
} catch (error: unknown) {
	console.error('Environment validation failed:', error);
	process.exit(1);
}

// Initialize database (only in development)
if (isDevelopment()) {
	initializeDatabase().catch((error: unknown) => {
		console.error('Failed to initialize database:', error);
		// Don't exit, let the server start anyway
	});
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

	// Configure CORS to allow multiple origins
	const allowedOrigins: RegExp[] = [
		/^http:\/\/localhost:\d+$/, // Match localhost with any port
		/.+\.railway\.app$/, // Match all Railway.app domains
		/.+\.akoniacodex\.com$/ // Match all akoniacodex.com subdomains
	];
app.use(cors({
	origin: allowedOrigins,
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
app.use('/api/parks/government', governmentParksRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
	console.log(`🚀 WeekendWhere SG API server running on http://localhost:${PORT}`);
	console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
	console.log(`🌳 Recommendations: http://localhost:${PORT}/api/recommendations`);
	console.log(`🇸🇬 Government Parks: http://localhost:${PORT}/api/parks/government?limit=6`);

	// Log environment configuration (debug info)
	const envConfig = getEnvConfig();
	console.log('⚙️  Environment Configuration:');
	console.log(`   - Mode: ${envConfig.nodeEnv}`);
	console.log(`   - Frontend URL: ${envConfig.frontendUrl}`);
	console.log(`   - Database: PostgreSQL ${envConfig.databaseHost}:${envConfig.databasePort}/${envConfig.databaseName}`);
	console.log(`   - Upload Directory: ${envConfig.uploadDir}`);
	console.log(`   - Weather API: ${envConfig.hasWeatherApiKey ? '✅ Configured' : '❌ Not configured'}`);
	console.log(`   - Maps API: ${envConfig.hasGoogleMapsApiKey ? '✅ Configured' : '❌ Not configured'}`);
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
