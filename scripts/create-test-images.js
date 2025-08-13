const fs = require('fs');
const path = require('path');

console.log('🎨 Creating test images for Streamly...');

// Create a simple test image for hiphop genre
const testImageContent = `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#FF6B6B"/>
  <text x="200" y="200" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">HIP-HOP</text>
</svg>`;

const testDir = path.join(__dirname, '..', 'assets', 'images', 'home', 'genres');
const testFile = path.join(testDir, 'hiphop.jpg');

// Since we can't create actual JPG files with Node.js easily, let's create a simple SVG first
const svgFile = path.join(testDir, 'hiphop.svg');
fs.writeFileSync(svgFile, testImageContent);

console.log('✅ Created test SVG image: assets/images/home/genres/hiphop.svg');
console.log('');
console.log('📋 Next steps:');
console.log('1. Convert the SVG to JPG or add your own hiphop.jpg image');
console.log('2. Add other genre images to: assets/images/home/genres/');
console.log('3. Add mood images to: assets/images/home/moods/');
console.log('');
console.log('💡 Quick test:');
console.log('- The app should now load without crashing');
console.log('- Missing images will show the default placeholder');
console.log('- You can add real images gradually');
console.log('');
console.log('🎯 Required images for Explore screen:');
console.log('- assets/images/home/genres/hiphop.jpg (or .svg)');
console.log('- assets/images/home/genres/pop.jpg');
console.log('- assets/images/home/genres/rock.jpg');
console.log('- assets/images/home/genres/country.jpg');
console.log('- assets/images/home/moods/party.jpg');
console.log('- assets/images/home/moods/chill.jpg');
console.log('');
console.log('✅ Test setup complete!');
