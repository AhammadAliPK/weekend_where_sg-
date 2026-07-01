/**
 * Environment Variable Management Utilities
 * Provides validation and type-safe access to environment variables
 */

interface EnvVarConfig {
  name: string;
  required: boolean;
  defaultValue?: string;
  validator?: (value: string) => boolean;
}

const envConfigs: EnvVarConfig[] = [
  // Server Configuration
  { name: 'PORT', required: false, defaultValue: '3000' },
  { name: 'NODE_ENV', required: false, defaultValue: 'development' },

  // Frontend Configuration
  { name: 'FRONTEND_URL', required: false, defaultValue: 'http://localhost:5173' },

  // Database Configuration
  { name: 'DATABASE_HOST', required: true, defaultValue: 'localhost' },
  { name: 'DATABASE_PORT', required: false, defaultValue: '5432' },
  { name: 'DATABASE_NAME', required: true },
  { name: 'DATABASE_USER', required: true },
  { name: 'DATABASE_PASSWORD', required: true },
  { name: 'DATABASE_SSL', required: false, defaultValue: 'false' },

  // JWT Authentication
  { name: 'JWT_SECRET', required: true },
  { name: 'JWT_EXPIRES_IN', required: false, defaultValue: '7d' },

  // External APIs
  { name: 'WEATHER_API_KEY', required: false },
  { name: 'WEATHER_API_URL', required: false, defaultValue: 'https://api.openweathermap.org/data/2.5' },
  { name: 'GOOGLE_MAPS_API_KEY', required: false },

  // File Upload Configuration
  { name: 'UPLOAD_DIR', required: false, defaultValue: './uploads' },
  { name: 'MAX_FILE_SIZE', required: false, defaultValue: '5242880' },
  { name: 'ALLOWED_FILE_TYPES', required: false, defaultValue: 'image/jpeg,image/png,image/webp' },

  // Rate Limiting
  { name: 'RATE_LIMIT_WINDOW_MS', required: false, defaultValue: '900000' },
  { name: 'RATE_LIMIT_MAX_REQUESTS', required: false, defaultValue: '100' },

  // CORS Configuration
  { name: 'CORS_ORIGIN', required: false, defaultValue: 'http://localhost:5173' },
];

/**
 * Validates all required environment variables
 * @throws Error if required environment variables are missing
 */
export function validateEnv(): void {
  const missing: string[] = [];
  const warnings: string[] = [];

  envConfigs.forEach(config => {
    const value = process.env[config.name];

    if (!value) {
      if (config.required) {
        missing.push(config.name);
      } else if (config.defaultValue) {
        process.env[config.name] = config.defaultValue;
      }
    } else if (config.validator && !config.validator(value)) {
      warnings.push(`${config.name} has invalid value: ${value}`);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please check your .env file and ensure all required variables are set.`
    );
  }

  if (warnings.length > 0) {
    console.warn('Environment variable warnings:');
    warnings.forEach(warning => console.warn(`  - ${warning}`));
  }

  console.log('✅ Environment variables validated successfully');
}

/**
 * Gets an environment variable with type safety
 * @param key Environment variable name
 * @param defaultValue Default value if not found
 * @returns Environment variable value or default
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not set and no default provided`);
  }
  return value || defaultValue || '';
}

/**
 * Gets a numeric environment variable
 * @param key Environment variable name
 * @param defaultValue Default value if not found
 * @returns Environment variable value as number
 */
export function getEnvNumber(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (!value) return defaultValue;

  const num = parseInt(value, 10);
  if (isNaN(num)) {
    throw new Error(`Environment variable ${key} is not a valid number: ${value}`);
  }
  return num;
}

/**
 * Gets a boolean environment variable
 * @param key Environment variable name
 * @param defaultValue Default value if not found
 * @returns Environment variable value as boolean
 */
export function getEnvBoolean(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (!value) return defaultValue;

  return value.toLowerCase() === 'true' || value === '1';
}

/**
 * Checks if the application is in production mode
 * @returns true if production environment
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Checks if the application is in development mode
 * @returns true if development environment
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Gets all environment configuration (for debugging/logging)
 * @returns Object with current environment configuration
 */
export function getEnvConfig(): Record<string, string | number | boolean> {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: getEnvNumber('PORT', 3000),
    frontendUrl: getEnv('FRONTEND_URL', 'http://localhost:5173'),
    databaseHost: getEnv('DATABASE_HOST', 'localhost'),
    databasePort: getEnvNumber('DATABASE_PORT', 5432),
    databaseName: getEnv('DATABASE_NAME', 'weekendwheresg'),
    databaseUser: getEnv('DATABASE_USER', 'postgres'),
    jwtExpiresIn: getEnv('JWT_EXPIRES_IN', '7d'),
    uploadDir: getEnv('UPLOAD_DIR', './uploads'),
    maxFileSize: getEnvNumber('MAX_FILE_SIZE', 5242880),
    rateLimitWindow: getEnvNumber('RATE_LIMIT_WINDOW_MS', 900000),
    rateLimitMax: getEnvNumber('RATE_LIMIT_MAX_REQUESTS', 100),
    hasWeatherApiKey: !!process.env.WEATHER_API_KEY,
    hasGoogleMapsApiKey: !!process.env.GOOGLE_MAPS_API_KEY,
    isProduction: isProduction(),
  };
};
