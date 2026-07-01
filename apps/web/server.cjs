/**
 * Simple static file server for Railway deployment
 * Serves SvelteKit static build with proper MIME types
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const buildPath = path.resolve(__dirname, 'build');

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Default to index.html for SPA routing
  let requestPath = req.url === '/' ? '/index.html' : req.url;

  // Try to serve the file
  const filePath = path.join(buildPath, requestPath);

  // If file doesn't exist and it's not an API route, serve index.html
  if (!fs.existsSync(filePath) && !requestPath.startsWith('/api')) {
    const indexPath = path.join(buildPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      serveFile(indexPath, res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  serveFile(filePath, res);
});

function serveFile(filePath, res) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    console.error('Error serving file:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from: ${buildPath}`);
  console.log(`Build exists: ${fs.existsSync(buildPath)}`);
});
