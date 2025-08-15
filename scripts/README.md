# Scripts

This directory contains utility scripts for the Streamly project.

## Available Scripts

### 1. `fetch-all-artist-images.js`

Fetches artist images from Spotify for both Hip-Hop and Bollywood artists.

**Usage:**
```bash
EXPO_PUBLIC_SPOTIFY_CLIENT_ID=xxx EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=yyy node scripts/fetch-all-artist-images.js
```

**What it does:**
- Parses artist names from `constants/hiphopArtists.ts` and `constants/bollywoodArtists.ts`
- Uses Spotify Client Credentials to fetch official images + popularity + followers
- Writes updated data to:
  - `constants/hiphopArtistsWithImages.ts`
  - `constants/bollywoodArtistsWithImages.ts`
  - `constants/artistImages.json`

### 2. `fetch-dance-electro-artist-images.js` ⭐ NEW

Fetches artist images from Spotify specifically for Dance/Electronic artists.

**Usage:**
```bash
EXPO_PUBLIC_SPOTIFY_CLIENT_ID=xxx EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=yyy node scripts/fetch-dance-electro-artist-images.js
```

**What it does:**
- Parses artist names from `constants/danceElectroArtistsWithImages.ts`
- Uses Spotify Client Credentials to fetch official images + popularity + followers
- Updates the existing dance/electronic artists data with real Spotify data
- Writes updated data to:
  - `constants/danceElectroArtistsWithImages.ts`
  - `constants/danceElectroArtistsWithImages.json`

**Features:**
- Rate limiting to avoid Spotify API throttling
- Fallback parsing for complex TypeScript files
- Progress tracking and success/failure reporting
- Top 5 most popular artists summary
- Preserves existing metadata (subgenre, country, active years)

### 3. `add-genre.js`

Adds new genres to the project.

### 4. `check-env.js`

Checks environment variables configuration.

## Setup

### Prerequisites

1. **Node.js** (version 18+ recommended for global fetch support)
2. **Spotify API Credentials**:
   - `EXPO_PUBLIC_SPOTIFY_CLIENT_ID`
   - `EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET`

### Environment Variables

Create a `.env` file in the project root with:

```env
EXPO_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

### Getting Spotify Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy the Client ID and Client Secret
4. Add them to your `.env` file

## Running Scripts

```bash
# Make sure you're in the project root
cd /path/to/streamly

# Run any script
node scripts/fetch-dance-electro-artist-images.js
```

## Output

The scripts will:
- Show progress for each artist being processed
- Display success/failure counts
- Generate updated TypeScript and JSON files
- Show top artists by popularity
- Handle errors gracefully with detailed logging

## Notes

- Scripts include rate limiting (120ms delay between requests) to respect Spotify's API limits
- Fallback parsing is available for complex TypeScript files
- All scripts are designed to be non-interactive and can be run in CI/CD environments
- Generated files maintain the same structure and interfaces as the original data
