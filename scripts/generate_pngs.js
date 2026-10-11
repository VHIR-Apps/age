const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\ac3c1eb6-ae32-4b4f-94d3-1287b36f4f60';
const svgStr = fs.readFileSync('public/assets/logo.svg', 'utf8');

// Transparent variant without dark container background
const transparentSvg = svgStr.replace(/<rect x="16" y="16" width="480" height="480" rx="110" fill="url\(#bgGrad\)"[^>]*\/>/, '');
fs.writeFileSync('public/assets/logo-transparent.svg', transparentSvg);

async function main() {
  // 1. High-res Badge 1024x1024
  await sharp(Buffer.from(svgStr)).resize(1024, 1024).png({ quality: 100 }).toFile('public/assets/logo.png');
  await sharp(Buffer.from(svgStr)).resize(1024, 1024).png({ quality: 100 }).toFile('public/assets/app-logo.png');
  await sharp(Buffer.from(svgStr)).resize(1024, 1024).png({ quality: 100 }).toFile(path.join(artifactDir, 'age_calculator_bd_logo_badge.png'));

  // 2. High-res Transparent Icon 1024x1024
  await sharp(Buffer.from(transparentSvg)).resize(1024, 1024).png({ quality: 100 }).toFile('public/assets/logo-transparent.png');
  await sharp(Buffer.from(transparentSvg)).resize(1024, 1024).png({ quality: 100 }).toFile(path.join(artifactDir, 'age_calculator_bd_logo_transparent.png'));

  console.log('Successfully generated all PNG logos!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
