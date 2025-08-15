const fs = require('fs');
const path = require('path');

// Create the artists directory if it doesn't exist
const artistsDir = path.join(__dirname, '../assets/images/home/artists');
if (!fs.existsSync(artistsDir)) {
  fs.mkdirSync(artistsDir, { recursive: true });
}

// Artist data with placeholder images
const artists = [
  {
    name: 'The Smiths',
    filename: 'the_smiths.jpg',
    placeholder: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=The+Smiths'
  },
  {
    name: 'The Clash',
    filename: 'the_clash.jpg',
    placeholder: 'https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=The+Clash'
  },
  {
    name: 'Joy Division',
    filename: 'joy_division.jpg',
    placeholder: 'https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Joy+Division'
  },
  {
    name: 'Queen',
    filename: 'queen.jpg',
    placeholder: 'https://via.placeholder.com/300x300/FDCB6E/FFFFFF?text=Queen'
  },
  {
    name: 'David Bowie',
    filename: 'david_bowie.jpg',
    placeholder: 'https://via.placeholder.com/300x300/74B9FF/FFFFFF?text=David+Bowie'
  },
  {
    name: 'The Beatles',
    filename: 'the_beatles.jpg',
    placeholder: 'https://via.placeholder.com/300x300/55A3FF/FFFFFF?text=The+Beatles'
  },
  {
    name: 'Pink Floyd',
    filename: 'pink_floyd.jpg',
    placeholder: 'https://via.placeholder.com/300x300/A29BFE/FFFFFF?text=Pink+Floyd'
  },
  {
    name: 'Led Zeppelin',
    filename: 'led_zeppelin.jpg',
    placeholder: 'https://via.placeholder.com/300x300/FF7675/FFFFFF?text=Led+Zeppelin'
  }
];

// Create a simple HTML file to download the images
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Download Artist Images</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .artist { margin: 20px 0; padding: 10px; border: 1px solid #ccc; }
        img { max-width: 200px; height: auto; }
        .download { margin-top: 10px; }
    </style>
</head>
<body>
    <h1>Artist Images for Download</h1>
    <p>Right-click on each image and "Save image as..." to download them to the assets/images/home/artists/ directory.</p>
    ${artists.map(artist => `
        <div class="artist">
            <h3>${artist.name}</h3>
            <img src="${artist.placeholder}" alt="${artist.name}" />
            <div class="download">
                <strong>Save as:</strong> ${artist.filename}
            </div>
        </div>
    `).join('')}
</body>
</html>
`;

// Write the HTML file
const htmlPath = path.join(__dirname, 'download-artist-images.html');
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ Generated artist image download page');
console.log(`📁 HTML file created: ${htmlPath}`);
console.log('🌐 Open this file in your browser to download the artist images');
console.log('📂 Save the images to: assets/images/home/artists/');
console.log('');
console.log('📋 Artist images to download:');
artists.forEach(artist => {
  console.log(`   - ${artist.name} → ${artist.filename}`);
});
