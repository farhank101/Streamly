# Streamly

A React Native/Expo music streaming application that aggregates music from YouTube to create a unified music experience. Inspired by SiriusXM's design, Streamly provides a comprehensive music streaming platform with a beautiful, professional UI.

## Features

- **Multiple Music Sources** support (YouTube)
- **Beautiful UI** with modern design patterns
- **Search Functionality** across all sources
- **Playlist Management** with create, edit, and delete
- **History Tracking** of listened tracks
- **Like/Unlike** tracks functionality
- **Background Audio** playback
- **Stream URL Resolution** for YouTube
- **Offline Support** for cached data
- **Responsive Design** for different screen sizes

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Expo Router** for navigation
- **SQLite** for local data storage
- **YouTube Data API v3** for music content
- **Last.fm API** for artist metadata
- **Genius API** for lyrics

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- React Native development environment

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your API keys:
   ```env
   EXPO_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
   EXPO_PUBLIC_LASTFM_API_KEY=your_lastfm_api_key
   EXPO_PUBLIC_GENIUS_API_KEY=your_genius_api_key
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

## API Configuration

### YouTube Data API v3

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "YouTube Data API v3"
4. Create credentials (API Key)
5. Add the API key to your `.env` file

### Last.fm API

1. Go to [Last.fm API](https://www.last.fm/api)
2. Create an account
3. Create an API application
4. Get your API key
5. Add the API key to your `.env` file

### Genius API

1. Go to [Genius API](https://genius.com/api-clients)
2. Create an account
3. Create an API client
4. Get your access token
5. Add the API key to your `.env` file

## Project Structure

```
streamly/
├── app/                    # Expo Router pages
├── components/             # Reusable UI components
├── constants/              # App constants and theme
├── context/                # React Context providers
├── hooks/                  # Custom React hooks
├── services/               # API and business logic
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## Features in Detail

### Search

- Real-time search across YouTube
- Filter by source type
- Search history
- Trending music suggestions

### Playback

- Background audio playback
- Playlist support
- Queue management
- Audio controls (play, pause, seek, volume)

### Library Management

- Create and manage playlists
- Like/unlike tracks
- View listening history
- Offline access to library

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
