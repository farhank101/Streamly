const fs = require("fs");
const path = require("path");

// This script helps you create placeholder images for your app
// You can replace these with your actual photos later

const imageConfigs = {
  // Genres
  genres: {
    hiphop: { text: "HIP-HOP", color: "#FF6B6B" },
    dance_electro: { text: "DANCE/ELECTRO", color: "#4ECDC4" },
    pop: { text: "POP", color: "#45B7D1" },
    country: { text: "COUNTRY", color: "#96CEB4" },
    rock: { text: "ROCK", color: "#FECA57" },
    indie: { text: "INDIE", color: "#FF9FF3" },
    latin: { text: "LATIN", color: "#54A0FF" },
    kpop: { text: "K-POP", color: "#5F27CD" },
    metal: { text: "METAL", color: "#00D2D3" },
    radio: { text: "RADIO", color: "#FF9F43" },
    progressive: { text: "PROGRESSIVE", color: "#A29BFE" },
  },

  // Moods
  moods: {
    party: { text: "PARTY", color: "#FF6B6B" },
    chill: { text: "CHILL", color: "#4ECDC4" },
    workout: { text: "WORKOUT", color: "#45B7D1" },
    romance: { text: "ROMANCE", color: "#96CEB4" },
    sleep: { text: "SLEEP", color: "#FECA57" },
    comedy: { text: "COMEDY", color: "#FF9FF3" },
    family: { text: "FAMILY", color: "#54A0FF" },
    travel: { text: "TRAVEL", color: "#5F27CD" },
  },
};

console.log("🎨 Placeholder Image Generator for Streamly");
console.log("==========================================");
console.log("");
console.log("This script will create placeholder images for your app.");
console.log("Replace these with your actual photos later!");
console.log("");

// Create directories if they don't exist
const baseDir = path.join(__dirname, "..", "assets", "images", "home");
const dirs = ["genres", "moods", "artists", "playlists", "podcasts", "albums"];

dirs.forEach((dir) => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

console.log("");
console.log("📋 Next steps:");
console.log("1. Add your actual genre photos to: assets/images/home/genres/");
console.log("2. Add mood photos to: assets/images/home/moods/");
console.log("3. Add artist photos to: assets/images/home/artists/");
console.log("4. Add playlist covers to: assets/images/home/playlists/");
console.log("5. Add podcast covers to: assets/images/home/podcasts/");
console.log("6. Add album covers to: assets/images/home/albums/");
console.log("");
console.log("💡 Image recommendations:");
console.log("- Use square images (1:1 aspect ratio)");
console.log("- Recommended size: 400x400px or larger");
console.log("- Format: JPG or PNG");
console.log("- Keep file sizes under 500KB for performance");
console.log("");
console.log("🎯 Example files to add:");
console.log("- assets/images/home/genres/hiphop.jpg");
console.log("- assets/images/home/genres/pop.jpg");
console.log("- assets/images/home/moods/party.jpg");
console.log("- assets/images/home/artists/queen.jpg");
console.log("");
console.log("✅ Directories created successfully!");
console.log("Now add your photos and the app will use them automatically.");
