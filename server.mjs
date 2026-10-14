import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.env.SERVE_DIR || 'public');
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };

createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/health') { res.writeHead(200, { 'content-type': 'text/plain' }); res.end('ok'); return; }
    let target = resolve(root, `.${pathname}`);
    if (!(target === root || target.startsWith(root + sep))) { res.writeHead(403); res.end('Forbidden'); return; }
    try { if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html'); } catch { /* use app fallback */ }
    let body;
    try { body = await readFile(target); } catch { target = resolve(root, 'index.html'); body = await readFile(target); }
    res.writeHead(200, { 'content-type': types[extname(target)] || 'application/octet-stream', 'cache-control': extname(target) === '.html' ? 'no-cache' : 'public, max-age=300' });
    res.end(body);
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(port, '0.0.0.0', () => console.log(`Nivoraa preview listening on 0.0.0.0:${port}; static root: ${root}`));
