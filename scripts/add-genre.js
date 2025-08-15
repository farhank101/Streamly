/**
 * Add Genre Script
 * Helper script to add new genres to the genreData.ts file
 */

const fs = require("fs");
const path = require("path");

// Template for a new genre
const genreTemplate = (genreName, color) => `  "${genreName
  .toLowerCase()
  .replace(/\s+/g, "_")}": { 
    name: "${genreName.toUpperCase()}", 
    color: "${color}",
    popular: [
      { id: "1", title: "Workout ${genreName}", image: "https://via.placeholder.com/200x200/${color.replace(
  "#",
  ""
)}/FFFFFF?text=WORKOUT+${genreName
  .toUpperCase()
  .replace(/\s+/g, "+")}", likes: "234,567" },
      { id: "2", title: "Love ${genreName}", image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=LOVE+${genreName
  .toUpperCase()
  .replace(/\s+/g, "+")}", likes: "156,789" },
      { id: "3", title: "${genreName} Essentials", image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=${genreName
  .toUpperCase()
  .replace(/\s+/g, "+")}+ESSENTIALS", likes: "198,234" },
    ],
    playlists: [
      { id: "1", title: "Top ${genreName}", image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=TOP+${genreName
  .toUpperCase()
  .replace(/\s+/g, "+")}", likes: "345,678" },
      { id: "2", title: "${genreName} Legends", image: "https://via.placeholder.com/200x200/00B894/FFFFFF?text=${genreName
  .toUpperCase()
  .replace(/\s+/g, "+")}+LEGENDS", likes: "123,456" },
      { id: "3", title: "Modern ${genreName}", image: "https://via.placeholder.com/200x200/FAB1A0/FFFFFF?text=MODERN+${genreName
  .toUpperCase()
  .replace(/\s+/g, "+")}", likes: "234,567" },
    ],
    newReleases: [
      { id: "1", title: "Sample Album 1", artist: "Artist 1", image: "https://via.placeholder.com/200x200/${color.replace(
        "#",
        ""
      )}/FFFFFF?text=ARTIST+1", releaseDate: "Album release: 01/01/23" },
      { id: "2", title: "Sample Album 2", artist: "Artist 2", image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=ARTIST+2", releaseDate: "Album release: 15/02/23" },
      { id: "3", title: "Sample Album 3", artist: "Artist 3", image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=ARTIST+3", releaseDate: "Album release: 30/03/23" },
    ],
    artists: [
      { id: "1", name: "Artist 1", image: "https://via.placeholder.com/150x150/${color.replace(
        "#",
        ""
      )}/FFFFFF?text=ARTIST+1", likes: "456K" },
      { id: "2", name: "Artist 2", image: "https://via.placeholder.com/150x150/FDCB6E/FFFFFF?text=ARTIST+2", likes: "345K" },
      { id: "3", name: "Artist 3", image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=ARTIST+3", likes: "234K" },
    ]
  },`;

// Example usage
console.log("Genre Template Generator");
console.log("=======================");
console.log("");
console.log("Use this template to add new genres:");
console.log("");
console.log(genreTemplate("Blues", "#8B5CF6"));
console.log("");
console.log("Copy the generated template and add it to your genreData.ts file");
console.log("Remember to update the ID mapping in your home screen as well");
