const https = require("https");

// Test the Last.fm API key directly
const API_KEY = "df473232e05c3a414914e0eab3b9d172"; // Clean key without colon
const ARTIST = "Queen";

console.log("🧪 Testing Last.fm API Key...\n");

const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
  ARTIST
)}&api_key=${API_KEY}&format=json`;

console.log(`🔗 Testing URL: ${url}\n`);

https
  .get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const result = JSON.parse(data);

        if (result.error) {
          console.log("❌ API Error:", result.message);
          console.log("   This means the API key is invalid or has issues.");
        } else {
          console.log("✅ API Success!");
          console.log(`   Artist: ${result.artist?.name || "Unknown"}`);

          if (result.artist?.image && Array.isArray(result.artist.image)) {
            const images = result.artist.image;
            console.log("   Available images:");
            images.forEach((img) => {
              if (img["#text"]) {
                console.log(`     ${img.size}: ${img["#text"]}`);
              }
            });
          } else {
            console.log("   No images found");
          }
        }
      } catch (error) {
        console.log("❌ Failed to parse response:", error.message);
      }
    });
  })
  .on("error", (error) => {
    console.log("❌ Network error:", error.message);
  });

console.log("⏳ Waiting for response...\n");
