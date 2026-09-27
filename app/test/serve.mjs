/* serve.mjs — serve build/ at the path it will live at on GitHub Pages, so a
   relative-path mistake shows up here and not on the live site. */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
export const BASE = '/Bizzing_Schedule/';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
export function serve(root, port = 0) {
  return new Promise((res) => {
    const s = createServer(async (req, out) => {
      const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (!u.startsWith(BASE)) { out.writeHead(404); return out.end('outside base'); }
      let p = normalize(join(root, u.slice(BASE.length) || 'index.html'));
      if (p.endsWith('/')) p += 'index.html';
      try { const b = await readFile(p); out.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' }); out.end(b); }
      catch { out.writeHead(404); out.end('nf'); }
    }).listen(port, () => res(s));
  });
}
