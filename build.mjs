import { cpSync, mkdirSync, rmSync } from 'node:fs';

const outputDirectory = new URL('./dist/', import.meta.url);
const outputPath = outputDirectory.pathname;

rmSync(outputPath, { recursive: true, force: true });
mkdirSync(outputPath, { recursive: true });

for (const file of ['index.html', 'styles.css', 'script.js']) {
  cpSync(new URL(`./${file}`, import.meta.url), new URL(`./dist/${file}`, import.meta.url));
}

for (const file of ['cgi-hero.jpg', 'cgi-estate.jpg', 'cgi-fashion.jpg', 'cgi-creative.jpg']) {
  cpSync(new URL(`./public/${file}`, import.meta.url), new URL(`./dist/${file}`, import.meta.url));
}

console.log('Static site built in dist/.');
