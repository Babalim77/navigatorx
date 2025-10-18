const fs = require('fs');
const path = require('path');

const cjsDir = path.join(__dirname, '../dist/cjs');
const files = fs.readdirSync(cjsDir);

files.forEach(file => {
  if (file.endsWith('.js')) {
    const oldPath = path.join(cjsDir, file);
    const newPath = path.join(__dirname, '../dist', file);
    fs.renameSync(oldPath, newPath);
  }
  if (file.endsWith('.js.map')) {
    const oldPath = path.join(cjsDir, file);
    const newPath = path.join(__dirname, '../dist', file);
    fs.renameSync(oldPath, newPath);
  }
});

fs.rmdirSync(cjsDir, { recursive: true });