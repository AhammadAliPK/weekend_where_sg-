/**
 * Production static file server for SvelteKit adapter-static output
 * Serves pre-built static files with SPA routing support
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const buildPath = path.resolve(__dirname, 'build');

// Serve static files from build directory
app.use(express.static(buildPath));

// SPA routing - serve index.html for all non-file routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
