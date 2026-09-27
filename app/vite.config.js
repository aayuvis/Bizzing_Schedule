import { defineConfig } from 'vite';
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/* The service worker is not an app module: it must land at the build root,
   unhashed, or its scope is wrong. The manifest and icons live in public/ for
   the same reason (the lesson Bizzing Finance paid for: hashed into assets/,
   the manifest's start_url resolved against the wrong directory). */
function copySW() {
  return { name: 'copy-sw', closeBundle() { const s = resolve(__dirname, 'sw.js'); if (existsSync(s)) copyFileSync(s, resolve(__dirname, 'build/sw.js')); } };
}

export default defineConfig({
  /* Relative base: the build is served from a sub-path
     (aayuvis.github.io/Bizzing_Schedule/) and must not assume a root. */
  base: './',
  plugins: [copySW()],
  build: { outDir: 'build', emptyOutDir: true, target: 'es2020' },
  server: { port: 8090, open: false },
});
