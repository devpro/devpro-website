import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

// Serves the built site as GitHub Pages does, so the suite checks what is deployed rather than the dev server.
const root = join(import.meta.dirname, '../_site');
const port = Number(process.env.E2E_PORT ?? 4598);
const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
};

function fileOf(path: string): string | undefined {
  try {
    return statSync(path).isFile() ? path : undefined;
  } catch {
    return undefined;
  }
}

createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost');
  const path = join(root, normalize(decodeURIComponent(url.pathname)));
  if (!path.startsWith(root)) {
    response.writeHead(403).end();
    return;
  }
  const file = fileOf(path);
  if (file) {
    response.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(response);
    return;
  }
  // A folder answers with a redirect to its trailing slash, as GitHub Pages does, so relative links resolve the same way.
  if (fileOf(join(path, 'index.html'))) {
    if (!url.pathname.endsWith('/')) {
      response.writeHead(301, { location: `${url.pathname}/${url.search}` }).end();
      return;
    }
    response.writeHead(200, { 'content-type': types['.html'] });
    createReadStream(join(path, 'index.html')).pipe(response);
    return;
  }
  response.writeHead(404).end('Not found');
}).listen(port, '127.0.0.1');
