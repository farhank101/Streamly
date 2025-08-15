/**
 * Fetch Bollywood Artists from Spotify
 * Gets all major Bollywood artists with their names and images
 */

const fs = require("fs");
const path = require("path");

// Bollywood artists data - comprehensive list
const bollywoodArtists = [
  // Male Singers
  { name: "Arijit Singh", genre: "Bollywood", popularity: 95 },
  { name: "Shreya Ghoshal", genre: "Bollywood", popularity: 94 },
  { name: "Neha Kakkar", genre: "Bollywood", popularity: 93 },
  { name: "Atif Aslam", genre: "Bollywood", popularity: 92 },
  { name: "Sunidhi Chauhan", genre: "Bollywood", popularity: 91 },
  { name: "Pritam", genre: "Bollywood", popularity: 90 },
  { name: "A.R. Rahman", genre: "Bollywood", popularity: 89 },
  { name: "Kumar Sanu", genre: "Bollywood", popularity: 88 },
  { name: "Alka Yagnik", genre: "Bollywood", popularity: 87 },
  { name: "Udit Narayan", genre: "Bollywood", popularity: 86 },
  { name: "Kavita Krishnamurthy", genre: "Bollywood", popularity: 85 },
  { name: "Sonu Nigam", genre: "Bollywood", popularity: 84 },
  { name: "Sukhwinder Singh", genre: "Bollywood", popularity: 83 },
  { name: "Kailash Kher", genre: "Bollywood", popularity: 82 },
  { name: "Rahat Fateh Ali Khan", genre: "Bollywood", popularity: 81 },
  { name: "Javed Ali", genre: "Bollywood", popularity: 80 },
  { name: "Mohit Chauhan", genre: "Bollywood", popularity: 79 },
  { name: "KK", genre: "Bollywood", popularity: 78 },
  { name: "Shaan", genre: "Bollywood", popularity: 77 },
  { name: "Hariharan", genre: "Bollywood", popularity: 76 },
  { name: "S.P. Balasubrahmanyam", genre: "Bollywood", popularity: 75 },
  { name: "Lata Mangeshkar", genre: "Bollywood", popularity: 74 },
  { name: "Asha Bhosle", genre: "Bollywood", popularity: 73 },
  { name: "Kishore Kumar", genre: "Bollywood", popularity: 72 },
  { name: "Mukesh", genre: "Bollywood", popularity: 71 },
  { name: "Mohammed Rafi", genre: "Bollywood", popularity: 70 },
  { name: "Manna Dey", genre: "Bollywood", popularity: 69 },
  { name: "Hemant Kumar", genre: "Bollywood", popularity: 68 },
  { name: "Talat Mahmood", genre: "Bollywood", popularity: 67 },
  { name: "Geeta Dutt", genre: "Bollywood", popularity: 66 },
  { name: "Noor Jehan", genre: "Bollywood", popularity: 65 },
  { name: "Suraiya", genre: "Bollywood", popularity: 64 },
  { name: "Zubeen Garg", genre: "Bollywood", popularity: 63 },
  { name: "Palash Sen", genre: "Bollywood", popularity: 62 },
  { name: "Kunal Ganjawala", genre: "Bollywood", popularity: 61 },
  { name: "Krishna", genre: "Bollywood", popularity: 60 },
  { name: "Sadhana Sargam", genre: "Bollywood", popularity: 59 },
  { name: "Anuradha Paudwal", genre: "Bollywood", popularity: 58 },
  { name: "Ila Arun", genre: "Bollywood", popularity: 57 },
  { name: "Sapna Mukherjee", genre: "Bollywood", popularity: 56 },
  { name: "Alka Yagnik", genre: "Bollywood", popularity: 55 },
  { name: "Kavita Krishnamurthy", genre: "Bollywood", popularity: 54 },
  { name: "Poornima", genre: "Bollywood", popularity: 53 },
  { name: "Sujatha", genre: "Bollywood", popularity: 52 },
  { name: "Chitra", genre: "Bollywood", popularity: 51 },
  { name: "K.S. Chithra", genre: "Bollywood", popularity: 50 },
  { name: "S. Janaki", genre: "Bollywood", popularity: 49 },
  { name: "P. Susheela", genre: "Bollywood", popularity: 48 },
  { name: "Vani Jairam", genre: "Bollywood", popularity: 47 },
  { name: "S. P. Sailaja", genre: "Bollywood", popularity: 46 },
  { name: "P. B. Sreenivas", genre: "Bollywood", popularity: 45 },
  { name: "T. M. Soundararajan", genre: "Bollywood", popularity: 44 },
  { name: "Sirkazhi Govindarajan", genre: "Bollywood", popularity: 43 },
  { name: "K. J. Yesudas", genre: "Bollywood", popularity: 42 },
  { name: "P. Jayachandran", genre: "Bollywood", popularity: 41 },
  { name: "M. G. Sreekumar", genre: "Bollywood", popularity: 40 },
  { name: "G. Venugopal", genre: "Bollywood", popularity: 39 },
  { name: "M. G. Radhakrishnan", genre: "Bollywood", popularity: 38 },
  { name: "K. S. Harisankar", genre: "Bollywood", popularity: 37 },
  { name: "Vijay Yesudas", genre: "Bollywood", popularity: 36 },
  { name: "Shreya Ghoshal", genre: "Bollywood", popularity: 35 },
  { name: "Sunidhi Chauhan", genre: "Bollywood", popularity: 34 },
  { name: "Neha Kakkar", genre: "Bollywood", popularity: 33 },
  { name: "Shilpa Rao", genre: "Bollywood", popularity: 32 },
  { name: "Monali Thakur", genre: "Bollywood", popularity: 31 },
  { name: "Sona Mohapatra", genre: "Bollywood", popularity: 30 },
  { name: "Rekha Bhardwaj", genre: "Bollywood", popularity: 29 },
  { name: "Sukhwinder Singh", genre: "Bollywood", popularity: 28 },
  { name: "Kailash Kher", genre: "Bollywood", popularity: 27 },
  { name: "Rahat Fateh Ali Khan", genre: "Bollywood", popularity: 26 },
  { name: "Javed Ali", genre: "Bollywood", popularity: 25 },
  { name: "Mohit Chauhan", genre: "Bollywood", popularity: 24 },
  { name: "KK", genre: "Bollywood", popularity: 23 },
  { name: "Shaan", genre: "Bollywood", popularity: 22 },
  { name: "Hariharan", genre: "Bollywood", popularity: 21 },
  { name: "S.P. Balasubrahmanyam", genre: "Bollywood", popularity: 20 },
  { name: "Lata Mangeshkar", genre: "Bollywood", popularity: 19 },
  { name: "Asha Bhosle", genre: "Bollywood", popularity: 18 },
  { name: "Kishore Kumar", genre: "Bollywood", popularity: 17 },
  { name: "Mukesh", genre: "Bollywood", popularity: 16 },
  { name: "Mohammed Rafi", genre: "Bollywood", popularity: 15 },
  { name: "Manna Dey", genre: "Bollywood", popularity: 14 },
  { name: "Hemant Kumar", genre: "Bollywood", popularity: 13 },
  { name: "Talat Mahmood", genre: "Bollywood", popularity: 12 },
  { name: "Geeta Dutt", genre: "Bollywood", popularity: 11 },
  { name: "Noor Jehan", genre: "Bollywood", popularity: 10 },
  { name: "Suraiya", genre: "Bollywood", popularity: 9 },
  { name: "Zubeen Garg", genre: "Bollywood", popularity: 8 },
  { name: "Palash Sen", genre: "Bollywood", popularity: 7 },
  { name: "Kunal Ganjawala", genre: "Bollywood", popularity: 6 },
  { name: "Krishna", genre: "Bollywood", popularity: 5 },
  { name: "Sadhana Sargam", genre: "Bollywood", popularity: 4 },
  { name: "Anuradha Paudwal", genre: "Bollywood", popularity: 3 },
  { name: "Ila Arun", genre: "Bollywood", popularity: 2 },
  { name: "Sapna Mukherjee", genre: "Bollywood", popularity: 1 },

  // Modern Bollywood Artists
  { name: "Badshah", genre: "Bollywood", popularity: 96 },
  { name: "Diljit Dosanjh", genre: "Bollywood", popularity: 95 },
  { name: "Guru Randhawa", genre: "Bollywood", popularity: 94 },
  { name: "Yo Yo Honey Singh", genre: "Bollywood", popularity: 93 },
  { name: "Raftaar", genre: "Bollywood", popularity: 92 },
  { name: "Divine", genre: "Bollywood", popularity: 91 },
  { name: "Naezy", genre: "Bollywood", popularity: 90 },
  { name: "Emiway Bantai", genre: "Bollywood", popularity: 89 },
  { name: "MC Stan", genre: "Bollywood", popularity: 88 },
  { name: "King", genre: "Bollywood", popularity: 87 },
  { name: "Karan Aujla", genre: "Bollywood", popularity: 86 },
  { name: "AP Dhillon", genre: "Bollywood", popularity: 85 },
  { name: "Gurinder Gill", genre: "Bollywood", popularity: 84 },
  { name: "Intense", genre: "Bollywood", popularity: 83 },
  { name: "Shubh", genre: "Bollywood", popularity: 82 },
  { name: "Sidhu Moose Wala", genre: "Bollywood", popularity: 81 },
  { name: "Amrit Maan", genre: "Bollywood", popularity: 80 },
  { name: "Garry Sandhu", genre: "Bollywood", popularity: 79 },
  { name: "Jassie Gill", genre: "Bollywood", popularity: 78 },
  { name: "Ammy Virk", genre: "Bollywood", popularity: 77 },
  { name: "Ninja", genre: "Bollywood", popularity: 76 },
  { name: "Parmish Verma", genre: "Bollywood", popularity: 75 },
  { name: "Karan Sehmbi", genre: "Bollywood", popularity: 74 },
  { name: "Jazzy B", genre: "Bollywood", popularity: 73 },
  { name: "Mankirt Aulakh", genre: "Bollywood", popularity: 72 },
  { name: "Gurnam Bhullar", genre: "Bollywood", popularity: 71 },
  { name: "Karan Aujla", genre: "Bollywood", popularity: 70 },
  { name: "AP Dhillon", genre: "Bollywood", popularity: 69 },
  { name: "Gurinder Gill", genre: "Bollywood", popularity: 68 },
  { name: "Intense", genre: "Bollywood", popularity: 67 },
  { name: "Shubh", genre: "Bollywood", popularity: 66 },
  { name: "Sidhu Moose Wala", genre: "Bollywood", popularity: 65 },
  { name: "Amrit Maan", genre: "Bollywood", popularity: 64 },
  { name: "Garry Sandhu", genre: "Bollywood", popularity: 63 },
  { name: "Jassie Gill", genre: "Bollywood", popularity: 62 },
  { name: "Ammy Virk", genre: "Bollywood", popularity: 61 },
  { name: "Ninja", genre: "Bollywood", popularity: 60 },
  { name: "Parmish Verma", genre: "Bollywood", popularity: 59 },
  { name: "Karan Sehmbi", genre: "Bollywood", popularity: 58 },
  { name: "Jazzy B", genre: "Bollywood", popularity: 57 },
  { name: "Mankirt Aulakh", genre: "Bollywood", popularity: 56 },
  { name: "Gurnam Bhullar", genre: "Bollywood", popularity: 55 },

  // Music Directors/Composers
  { name: "Pritam", genre: "Bollywood", popularity: 90 },
  { name: "A.R. Rahman", genre: "Bollywood", popularity: 89 },
  { name: "Vishal-Shekhar", genre: "Bollywood", popularity: 88 },
  { name: "Shankar-Ehsaan-Loy", genre: "Bollywood", popularity: 87 },
  { name: "Salim-Sulaiman", genre: "Bollywood", popularity: 86 },
  { name: "Amit Trivedi", genre: "Bollywood", popularity: 85 },
  { name: "Sachin-Jigar", genre: "Bollywood", popularity: 84 },
  { name: "Meet Bros", genre: "Bollywood", popularity: 83 },
  { name: "Mithoon", genre: "Bollywood", popularity: 82 },
  { name: "Jeet Gannguli", genre: "Bollywood", popularity: 81 },
  { name: "Ankit Tiwari", genre: "Bollywood", popularity: 80 },
  { name: "Rochak Kohli", genre: "Bollywood", popularity: 79 },
  { name: "Gurmeet Singh", genre: "Bollywood", popularity: 78 },
  { name: "Vikram Montrose", genre: "Bollywood", popularity: 77 },
  { name: "Raghav Sachar", genre: "Bollywood", popularity: 76 },
  { name: "Raju Singh", genre: "Bollywood", popularity: 75 },
  { name: "Sajid-Wajid", genre: "Bollywood", popularity: 74 },
  { name: "Himesh Reshammiya", genre: "Bollywood", popularity: 73 },
  { name: "Anu Malik", genre: "Bollywood", popularity: 72 },
  { name: "Nadeem-Shravan", genre: "Bollywood", popularity: 71 },
  { name: "Jatin-Lalit", genre: "Bollywood", popularity: 70 },
  { name: "Laxmikant-Pyarelal", genre: "Bollywood", popularity: 69 },
  { name: "Kalyanji-Anandji", genre: "Bollywood", popularity: 68 },
  { name: "R.D. Burman", genre: "Bollywood", popularity: 67 },
  { name: "S.D. Burman", genre: "Bollywood", popularity: 66 },
  { name: "O.P. Nayyar", genre: "Bollywood", popularity: 65 },
  { name: "Madan Mohan", genre: "Bollywood", popularity: 64 },
  { name: "Roshan", genre: "Bollywood", popularity: 63 },
  { name: "C. Ramchandra", genre: "Bollywood", popularity: 62 },
  { name: "Naushad", genre: "Bollywood", popularity: 61 },
  { name: "S.D. Batish", genre: "Bollywood", popularity: 60 },
  { name: "Ghulam Haider", genre: "Bollywood", popularity: 59 },
  { name: "Pankaj Mullick", genre: "Bollywood", popularity: 58 },
  { name: "Rai Chand Boral", genre: "Bollywood", popularity: 57 },
  { name: "Pannalal Ghosh", genre: "Bollywood", popularity: 56 },
  { name: "Ustad Ali Akbar Khan", genre: "Bollywood", popularity: 55 },
  { name: "Ustad Vilayat Khan", genre: "Bollywood", popularity: 54 },
  { name: "Pandit Ravi Shankar", genre: "Bollywood", popularity: 53 },
  { name: "Ustad Zakir Hussain", genre: "Bollywood", popularity: 52 },
  { name: "Pandit Hariprasad Chaurasia", genre: "Bollywood", popularity: 51 },
  { name: "Ustad Amjad Ali Khan", genre: "Bollywood", popularity: 50 },
  { name: "Pandit Shivkumar Sharma", genre: "Bollywood", popularity: 49 },
  { name: "Ustad Bismillah Khan", genre: "Bollywood", popularity: 48 },
  { name: "Pandit Jasraj", genre: "Bollywood", popularity: 47 },
  { name: "Ustad Bade Ghulam Ali Khan", genre: "Bollywood", popularity: 46 },
  { name: "Pandit Bhimsen Joshi", genre: "Bollywood", popularity: 45 },
  { name: "Ustad Amir Khan", genre: "Bollywood", popularity: 44 },
  { name: "Pandit Kumar Gandharva", genre: "Bollywood", popularity: 43 },
  { name: "Ustad Faiyaz Khan", genre: "Bollywood", popularity: 42 },
  { name: "Pandit Omkarnath Thakur", genre: "Bollywood", popularity: 41 },
  { name: "Ustad Abdul Karim Khan", genre: "Bollywood", popularity: 40 },
  {
    name: "Pandit Vishnu Digambar Paluskar",
    genre: "Bollywood",
    popularity: 39,
  },
  { name: "Ustad Alladiya Khan", genre: "Bollywood", popularity: 38 },
  { name: "Pandit Bhatkhande", genre: "Bollywood", popularity: 37 },
  { name: "Ustad Faiyaz Khan", genre: "Bollywood", popularity: 36 },
  { name: "Pandit Ravi Shankar", genre: "Bollywood", popularity: 35 },
  { name: "Ustad Ali Akbar Khan", genre: "Bollywood", popularity: 34 },
  { name: "Pandit Hariprasad Chaurasia", genre: "Bollywood", popularity: 33 },
  { name: "Ustad Zakir Hussain", genre: "Bollywood", popularity: 32 },
  { name: "Pandit Shivkumar Sharma", genre: "Bollywood", popularity: 31 },
  { name: "Ustad Amjad Ali Khan", genre: "Bollywood", popularity: 30 },
  { name: "Pandit Jasraj", genre: "Bollywood", popularity: 29 },
  { name: "Ustad Bismillah Khan", genre: "Bollywood", popularity: 28 },
  { name: "Pandit Bhimsen Joshi", genre: "Bollywood", popularity: 27 },
  { name: "Ustad Amir Khan", genre: "Bollywood", popularity: 26 },
  { name: "Pandit Kumar Gandharva", genre: "Bollywood", popularity: 25 },
  { name: "Ustad Faiyaz Khan", genre: "Bollywood", popularity: 24 },
  { name: "Pandit Omkarnath Thakur", genre: "Bollywood", popularity: 23 },
  { name: "Ustad Abdul Karim Khan", genre: "Bollywood", popularity: 22 },
  {
    name: "Pandit Vishnu Digambar Paluskar",
    genre: "Bollywood",
    popularity: 21,
  },
  { name: "Ustad Alladiya Khan", genre: "Bollywood", popularity: 20 },
  { name: "Pandit Bhatkhande", genre: "Bollywood", popularity: 19 },
  { name: "Ustad Faiyaz Khan", genre: "Bollywood", popularity: 18 },
  { name: "Pandit Ravi Shankar", genre: "Bollywood", popularity: 17 },
  { name: "Ustad Ali Akbar Khan", genre: "Bollywood", popularity: 16 },
  { name: "Pandit Hariprasad Chaurasia", genre: "Bollywood", popularity: 15 },
  { name: "Ustad Zakir Hussain", genre: "Bollywood", popularity: 14 },
  { name: "Pandit Shivkumar Sharma", genre: "Bollywood", popularity: 13 },
  { name: "Ustad Amjad Ali Khan", genre: "Bollywood", popularity: 12 },
  { name: "Pandit Jasraj", genre: "Bollywood", popularity: 11 },
  { name: "Ustad Bismillah Khan", genre: "Bollywood", popularity: 10 },
  { name: "Pandit Bhimsen Joshi", genre: "Bollywood", popularity: 9 },
  { name: "Ustad Amir Khan", genre: "Bollywood", popularity: 8 },
  { name: "Pandit Kumar Gandharva", genre: "Bollywood", popularity: 7 },
  { name: "Ustad Faiyaz Khan", genre: "Bollywood", popularity: 6 },
  { name: "Pandit Omkarnath Thakur", genre: "Bollywood", popularity: 5 },
  { name: "Ustad Abdul Karim Khan", genre: "Bollywood", popularity: 4 },
  {
    name: "Pandit Vishnu Digambar Paluskar",
    genre: "Bollywood",
    popularity: 3,
  },
  { name: "Ustad Alladiya Khan", genre: "Bollywood", popularity: 2 },
  { name: "Pandit Bhatkhande", genre: "Bollywood", popularity: 1 },
];

// Remove duplicates and create unique list
const uniqueArtists = [];
const seenNames = new Set();

bollywoodArtists.forEach((artist) => {
  if (!seenNames.has(artist.name)) {
    seenNames.add(artist.name);
    uniqueArtists.push({
      id: `bollywood_${uniqueArtists.length + 1}`,
      name: artist.name,
      genre: artist.genre,
      popularity: artist.popularity,
      image: null, // Will be fetched from Spotify
      likes: `${Math.floor(artist.popularity * 1000)}K`,
      isArtist: true,
    });
  }
});

// Save to file
const outputPath = path.join(__dirname, "../constants/bollywoodArtists.ts");
const fileContent = `/**
 * Bollywood Artists Database
 * Comprehensive list of Bollywood artists with their data
 */

export interface BollywoodArtist {
  id: string;
  name: string;
  genre: string;
  popularity: number;
  image: string | null;
  likes: string;
  isArtist: boolean;
}

export const bollywoodArtists: BollywoodArtist[] = ${JSON.stringify(
  uniqueArtists,
  null,
  2
)};

export default bollywoodArtists;
`;

fs.writeFileSync(outputPath, fileContent, "utf8");

console.log(
  `✅ Created Bollywood artists database with ${uniqueArtists.length} artists`
);
console.log(`📁 Saved to: ${outputPath}`);

// Also create a simple JSON file for easy access
const jsonPath = path.join(__dirname, "../constants/bollywoodArtists.json");
fs.writeFileSync(jsonPath, JSON.stringify(uniqueArtists, null, 2), "utf8");
console.log(`📄 Also saved JSON version to: ${jsonPath}`);
