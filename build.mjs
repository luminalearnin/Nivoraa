import { cp, mkdir, rm, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const routes = [
  'shop',
  'collections/women', 'collections/men', 'collections/kids', 'collections/jewellery',
  'products/gulabi-midi', 'products/noir-dress', 'products/sunday-cotton', 'products/small-moments'
];
const staticFiles = ['index.html', 'app.js', 'styles.css', 'favicon.svg', 'manus-routes.json'];

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of staticFiles) await copyFile(file, join('dist', file));
await cp('assets', 'dist/assets', { recursive: true });

async function generatePages(destination) {
  await copyFile('index.html', join(destination, '404.html'));
  for (const route of routes) {
    const folder = join(destination, route);
    await mkdir(folder, { recursive: true });
    await copyFile('index.html', join(folder, 'index.html'));
  }
}

// GitHub Pages is configured to serve from main:/, so materialize direct-route
// entry points there as well as in dist for portable static builds.
await generatePages('.');
await generatePages('dist');
console.log(`Built ${routes.length + 1} GitHub Pages route entry points into dist/.`);
