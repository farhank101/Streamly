const fs = require('fs');
const path = require('path');

// Create placeholder images for missing genres
const missingGenres = [
  'pop',
  'country', 
  'rock',
  'indie'
];

const genresDir = path.join(__dirname, '../assets/images/home/genres');

// Ensure the genres directory exists
if (!fs.existsSync(genresDir)) {
  fs.mkdirSync(genresDir, { recursive: true });
}

// Create placeholder SVG files for missing genres
missingGenres.forEach(genre => {
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#333333"/>
  <text x="100" y="100" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
        text-anchor="middle" dominant-baseline="middle" fill="white">
    ${genre.toUpperCase()}
  </text>
</svg>`;
  
  const filePath = path.join(genresDir, `${genre}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created placeholder for ${genre}`);
});

console.log('Genre placeholder images created successfully!');
