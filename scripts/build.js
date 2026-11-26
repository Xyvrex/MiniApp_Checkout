// A tiny build step: copies src/ to dist/ and stamps the commit into the page footer.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(src, dist, { recursive: true });

const version = (process.env.GITHUB_SHA || 'local').slice(0, 7);
const indexPath = path.join(dist, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8').replace('__BUILD_VERSION__', version);
fs.writeFileSync(indexPath, html);

console.log(`Built dist/ (version: ${version})`);
