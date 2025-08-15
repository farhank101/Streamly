const fs = require("fs");
const path = require("path");
const https = require("https");

// Create the artists directory if it doesn't exist
const artistsDir = path.join(__dirname, "../assets/images/home/artists");
if (!fs.existsSync(artistsDir)) {
  fs.mkdirSync(artistsDir, { recursive: true });
}

// Artist data with placeholder images
const artists = [
  {
    name: "The Smiths",
    filename: "the_smiths.jpg",
    placeholder:
      "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=The+Smiths",
  },
  {
    name: "The Clash",
    filename: "the_clash.jpg",
    placeholder:
      "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=The+Clash",
  },
  {
    name: "Joy Division",
    filename: "joy_division.jpg",
    placeholder:
      "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Joy+Division",
  },
  {
    name: "Queen",
    filename: "queen.jpg",
    placeholder: "https://via.placeholder.com/300x300/FDCB6E/FFFFFF?text=Queen",
  },
  {
    name: "David Bowie",
    filename: "david_bowie.jpg",
    placeholder:
      "https://via.placeholder.com/300x300/74B9FF/FFFFFF?text=David+Bowie",
  },
  {
    name: "The Beatles",
    filename: "the_beatles.jpg",
    placeholder:
      "https://via.placeholder.com/300x300/55A3FF/FFFFFF?text=The+Beatles",
  },
  {
    name: "Pink Floyd",
    filename: "pink_floyd.jpg",
    placeholder:
      "https://via.placeholder.com/300x300/A29BFE/FFFFFF?text=Pink+Floyd",
  },
  {
    name: "Led Zeppelin",
    filename: "led_zeppelin.jpg",
    placeholder:
      "https://via.placeholder.com/300x300/FF7675/FFFFFF?text=Led+Zeppelin",
  },
];

// Function to download an image
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(filepath);
          response.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            console.log(`✅ Downloaded: ${filepath}`);
            resolve();
          });
          fileStream.on("error", (err) => {
            fs.unlink(filepath, () => {}); // Delete the file if there was an error
            reject(err);
          });
        } else {
          reject(new Error(`Failed to download: ${response.statusCode}`));
        }
      })
      .on("error", reject);
  });
};

// Download all artist images
const downloadAllImages = async () => {
  console.log("🔄 Starting to download artist images...");

  for (const artist of artists) {
    const filepath = path.join(artistsDir, artist.filename);
    try {
      await downloadImage(artist.placeholder, filepath);
    } catch (error) {
      console.error(`❌ Failed to download ${artist.name}:`, error.message);
    }
  }

  console.log("🎉 Download process completed!");
  console.log(`📁 Images saved to: ${artistsDir}`);
};

// Run the download
downloadAllImages().catch(console.error);
