# WeekendWhere SG - Environment Setup Guide

This guide explains how to configure environment variables for WeekendWhere SG development.

## Overview

WeekendWhere SG uses environment variables to manage configuration across different environments (development, production). This allows you to:

- Keep sensitive data (API keys, secrets) out of version control
- Customize settings per environment
- Enable/disable features dynamically
- Share configuration templates with team members

## Quick Start

### 1. Backend Setup

1. Copy the example environment file:
   ```bash
   cd apps/api
   cp .env.example .env
   ```

2. Edit `.env` and add your configuration:
   ```bash
   # Required for development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

3. For advanced features, add optional API keys:
   ```bash
   # Weather API (optional)
   WEATHER_API_KEY=your-openweather-api-key

   # Google Maps API (optional)
   GOOGLE_MAPS_API_KEY=your-maps-api-key
   ```

### 2. Frontend Setup

1. Copy the example environment file:
   ```bash
   cd apps/web
   cp .env.example .env
   ```

2. The frontend `.env` comes with sensible defaults for development.

## Environment Variables Reference

### Backend Variables (.env)

#### Server Configuration
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3000 | Server port |
| `NODE_ENV` | No | development | Environment mode |
| `FRONTEND_URL` | No | http://localhost:5173 | Frontend URL for CORS |

#### Database
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_PATH` | No | ./data/database.sqlite | SQLite database path |

#### Authentication
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `JWT_SECRET` | **Yes** | - | Secret key for JWT tokens |
| `JWT_EXPIRES_IN` | No | 7d | Token expiration time |

#### External APIs
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `WEATHER_API_KEY` | No | - | OpenWeather API key |
| `WEATHER_API_URL` | No | https://api.openweathermap.org/data/2.5 | Weather API URL |
| `GOOGLE_MAPS_API_KEY` | No | - | Google Maps API key |

#### File Upload
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `UPLOAD_DIR` | No | ./uploads | Upload directory path |
| `MAX_FILE_SIZE` | No | 5242880 | Max file size (bytes) |
| `ALLOWED_FILE_TYPES` | No | image/jpeg,image/png,image/webp | Allowed file types |

#### Rate Limiting
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `RATE_LIMIT_WINDOW_MS` | No | 900000 | Rate limit window (ms) |
| `RATE_LIMIT_MAX_REQUESTS` | No | 100 | Max requests per window |

### Frontend Variables (.env)

**Note:** Frontend variables must be prefixed with `VITE_` to be accessible to client code.

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | No | http://localhost:3000 | Backend API URL |
| `VITE_APP_NAME` | No | WeekendWhere SG | Application name |
| `VITE_APP_VERSION` | No | 1.0.0 | Application version |
| `VITE_ENABLE_WEATHER` | No | true | Enable weather features |
| `VITE_ENABLE_MRT` | No | true | Enable MRT features |
| `VITE_ENABLE_DIRECTIONS` | No | true | Enable directions features |
| `VITE_ENABLE_REVIEWS` | No | true | Enable review features |
| `VITE_ENABLE_FAVORITES` | No | true | Enable favorites features |

## Security Best Practices

### ✅ DO:

- **Keep .env files out of version control** - They're already in .gitignore
- **Use strong, random secrets** for JWT_SECRET in production
- **Rotate secrets regularly** - Especially when deploying to production
- **Use different secrets** for development and production
- **Commit .env.example files** - They serve as templates

### ❌ DON'T:

- **Never commit .env files** with real secrets to git
- **Don't share secrets** in chat, email, or public forums
- **Don't use weak secrets** like "secret" or "password123"
- **Don't reuse secrets** across different applications
- **Don't forget to update** .env.example when adding new variables

## Getting API Keys

### Weather API (Optional)

For Singapore weather, you can use:

1. **OpenWeather API** (Free tier available):
   - Sign up at https://openweathermap.org/api
   - Get your API key from the dashboard
   - Add `WEATHER_API_KEY=your-key-here` to backend `.env`

2. **NEA Singapore** (Official weather data):
   - Requires registration with NEA
   - More accurate for Singapore
   - Contact NEA for API access

### Google Maps API (Optional)

For directions and maps features:

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable "Maps JavaScript API" and "Places API"
4. Create an API key with appropriate restrictions
5. Add `GOOGLE_MAPS_API_KEY=your-key-here` to backend `.env`

## Environment Validation

The backend automatically validates required environment variables on startup:

✅ **Success:**
```
✅ Environment variables validated successfully
```

❌ **Failure:**
```
❌ Missing required environment variables: JWT_SECRET
Please check your .env file and ensure all required variables are set.
```

## Development Workflow

1. **Initial Setup:**
   ```bash
   # Backend
   cd apps/api
   cp .env.example .env
   # Edit .env with your values

   # Frontend
   cd apps/web
   cp .env.example .env
   # Edit .env with your values
   ```

2. **Run Development Servers:**
   ```bash
   # Terminal 1 - Backend
   cd apps/api
   pnpm dev

   # Terminal 2 - Frontend
   cd apps/web
   pnpm dev
   ```

3. **Verify Configuration:**
   - Check backend startup logs for environment info
   - Open browser console for frontend configuration

## Production Deployment

For production deployment:

1. **Set all required environment variables** in your hosting platform
2. **Use strong, unique secrets** for JWT and other sensitive data
3. **Enable all required external APIs** with production keys
4. **Configure CORS** to allow your production frontend URL
5. **Test environment validation** before deploying

## Troubleshooting

### Issue: "Missing required environment variables"

**Solution:** Make sure you've created a `.env` file and added all required variables.

### Issue: "Environment variables not loading in frontend"

**Solution:** Ensure frontend variables are prefixed with `VITE_` and restart the dev server.

### Issue: "API key not working"

**Solution:**
1. Verify the API key is correct
2. Check if the API service is enabled
3. Ensure you have sufficient quota/credits
4. Check API logs for specific error messages

### Issue: "CORS errors in production"

**Solution:** Update `CORS_ORIGIN` in backend `.env` to your production frontend URL.

## Need Help?

If you encounter issues with environment setup:

1. Check the example files: `.env.example` in both `apps/api` and `apps/web`
2. Verify your `.env` files are in the correct directories
3. Ensure you're using the correct variable names and formats
4. Check the error messages for specific guidance
5. Review this documentation for common solutions

## File Locations

- **Backend:** `apps/api/.env`
- **Frontend:** `apps/web/.env`
- **Backend Example:** `apps/api/.env.example`
- **Frontend Example:** `apps/web/.env.example`
- **Git Ignore:** `.gitignore` (ensures .env files aren't committed)
