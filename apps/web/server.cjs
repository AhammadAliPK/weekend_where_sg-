/**
 * Production static file server for SvelteKit adapter-static output
 * Serves pre-built static files with SPA routing support
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Find build directory - try multiple possible locations
const possiblePaths = [
  path.resolve(__dirname, 'build'),
  path.resolve(process.cwd(), 'build'),
  path.resolve('/app/apps/web/build'),
  path.resolve('/app/build')
];

let buildPath = possiblePaths[0];
for (const testPath of possiblePaths) {
  if (fs.existsSync(testPath)) {
    buildPath = testPath;
    console.log(`Found build directory at: ${buildPath}`);
    break;
  }
}

// Log what we found
console.log(`Current directory: ${__dirname}`);
console.log(`Working directory: ${process.cwd()}`);
console.log(`Build path: ${buildPath}`);
console.log(`Build exists: ${fs.existsSync(buildPath)}`);

if (fs.existsSync(buildPath)) {
  const files = fs.readdirSync(buildPath);
  console.log(`Build files: ${files.slice(0, 10).join(', ')} (showing first 10)`);
} else {
  console.error(`Build directory not found at: ${buildPath}`);
  process.exit(1);
}

// Serve static files with proper MIME types and error handling
const serveStatic = (req, res, next) => {
  try {
    const filePath = path.join(buildPath, req.path);

    // Security check - prevent directory traversal
    const normalizedPath = path.normalize(filePath);
    if (!normalizedPath.startsWith(buildPath)) {
      return res.status(403).send('Forbidden');
    }

    // Check if file exists
    if (fs.existsSync(normalizedPath) && fs.statSync(normalizedPath).isFile()) {
      const ext = path.extname(normalizedPath);
      const contentTypes = {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2'
      };

      const contentType = contentTypes[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);

      const fileContent = fs.readFileSync(normalizedPath);
      res.send(fileContent);
    } else {
      next(); // Fall through to SPA handler
    }
  } catch (error) {
    console.error(`Error serving ${req.path}:`, error.message);
    next();
  }
};

app.use(serveStatic);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// SPA routing - serve index.html for all non-file routes
app.get('*', (req, res) => {
  try {
    const indexPath = path.join(buildPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.setHeader('Content-Type', 'text/html');
      const indexContent = fs.readFileSync(indexPath);
      res.send(indexContent);
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.error('Error serving index.html:', error.message);
    res.status(500).send('Internal server error');
  }
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).send('Internal server error');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from: ${buildPath}`);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection:', reason);
});
