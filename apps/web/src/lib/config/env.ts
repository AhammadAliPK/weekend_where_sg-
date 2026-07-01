/**
 * Frontend Environment Variable Utilities
 * Provides type-safe access to Vite environment variables
 */

/**
 * Gets a Vite environment variable with type safety
 * @param key Environment variable name (without VITE_ prefix)
 * @param defaultValue Default value if not found
 * @returns Environment variable value or default
 */
export function getEnv(key: string, defaultValue: string = ''): string {
	const fullKey = `VITE_${key}`;
	const value = import.meta.env[fullKey];
	return value || defaultValue;
}

/**
 * Gets a boolean environment variable
 * @param key Environment variable name (without VITE_ prefix)
 * @param defaultValue Default value if not found
 * @returns Environment variable value as boolean
 */
export function getEnvBoolean(key: string, defaultValue: boolean = false): boolean {
	const value = getEnv(key);
	return value === 'true' || value === '1' || defaultValue;
}

/**
 * Application configuration from environment variables
 */
export const appConfig = {
	apiUrl: getEnv('API_URL', 'http://localhost:3000'),
	appName: getEnv('APP_NAME', 'WeekendWhere SG'),
	appVersion: getEnv('APP_VERSION', '1.0.0'),

	// Feature flags
	enableWeather: getEnvBoolean('ENABLE_WEATHER', true),
	enableMRT: getEnvBoolean('ENABLE_MRT', true),
	enableDirections: getEnvBoolean('ENABLE_DIRECTIONS', true),
	enableReviews: getEnvBoolean('ENABLE_REVIEWS', true),
	enableFavorites: getEnvBoolean('ENABLE_FAVORITES', true),

	// Development mode
	isDevelopment: import.meta.env.DEV,
	isProduction: import.meta.env.PROD,
} as const;

/**
 * API configuration
 */
export const apiConfig = {
	baseUrl: appConfig.apiUrl,
	timeout: 10000, // 10 seconds
	retries: 3,
} as const;

/**
 * Logs the current environment configuration (for debugging)
 */
export function logConfig(): void {
	if (appConfig.isDevelopment) {
		console.log('🔧 Application Configuration:');
		console.log(`   - API URL: ${appConfig.apiUrl}`);
		console.log(`   - App Name: ${appConfig.appName}`);
		console.log(`   - Version: ${appConfig.appVersion}`);
		console.log(`   - Features:`);
		console.log(`     • Weather: ${appConfig.enableWeather ? '✅' : '❌'}`);
		console.log(`     • MRT: ${appConfig.enableMRT ? '✅' : '❌'}`);
		console.log(`     • Directions: ${appConfig.enableDirections ? '✅' : '❌'}`);
		console.log(`     • Reviews: ${appConfig.enableReviews ? '✅' : '❌'}`);
		console.log(`     • Favorites: ${appConfig.enableFavorites ? '✅' : '❌'}`);
	}
}
