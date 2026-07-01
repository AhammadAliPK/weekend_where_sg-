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
}

// Serve static files from build directory
app.use(express.static(buildPath, {
  fallthrough: true // Let SPA handler handle unmatched routes
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// SPA routing - serve index.html for all non-file routes
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`Not found - index.html missing at ${indexPath}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from: ${buildPath}`);
});
