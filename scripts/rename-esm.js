const fs = require('fs');
const path = require('path');

const esmDir = path.join(__dirname, '../dist/esm');
const files = fs.readdirSync(esmDir);

files.forEach(file => {
  if (file.endsWith('.js')) {
    const oldPath = path.join(esmDir, file);
    const newPath = path.join(__dirname, '../dist', file.replace('.js', '.mjs'));
    fs.renameSync(oldPath, newPath);
  }
  if (file.endsWith('.js.map')) {
    const oldPath = path.join(esmDir, file);
    const newPath = path.join(__dirname, '../dist', file.replace('.js.map', '.mjs.map'));
    fs.renameSync(oldPath, newPath);
  }
});

fs.rmdirSync(esmDir, { recursive: true });