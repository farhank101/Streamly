# Streamly - Music Streaming App

A React Native/Expo music streaming application that aggregates music from multiple sources (YouTube and Audius) to create a unified music experience. Inspired by SiriusXM's design, Streamly provides a comprehensive music streaming platform with a beautiful, professional UI.

## 🚀 Features

### ✅ Implemented

- **Modern React Native Architecture** with Expo Router
- **TypeScript** configuration and comprehensive type definitions
- **Authentication System** with Supabase integration
- **Audio Playback Engine** using Expo AV
- **State Management** with React Context
- **SiriusXM-inspired UI/UX** with dark theme and red accents
- **Navigation** with tab-based layout and modal screens
- **Mini Player** with basic playback controls
- **Progress Bar** with seeking functionality
- **Multiple Music Sources** support (YouTube, Audius)
- **Professional Design System** with consistent theming
- **Error Handling** and loading states throughout the app

### 🚧 In Progress

- **Stream URL Resolution** for YouTube and Audius
- **Database Operations** for playlists and user data
- **Search Results** with real data integration

### 📋 Planned

- **Voice Search** using speech recognition
- **Offline Caching** and data persistence
- **Background Audio Playback**
- **CarPlay/Android Auto** integration
- **Social Features** (sharing, following)
- **Advanced Recommendations**

## 🛠️ Tech Stack

- **Frontend**: React Native 0.79.5, Expo SDK 53
- **Navigation**: Expo Router
- **State Management**: React Context + Hooks
- **Audio**: Expo AV
- **Backend**: Supabase
- **Styling**: React Native StyleSheet
- **Icons**: Expo Vector Icons
- **Language**: TypeScript
- **Development**: Expo CLI

## 📱 Screenshots

_Screenshots will be added as the app develops_

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Emulator
- Supabase account
- YouTube Data API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd streamly
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   # Supabase Configuration
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # YouTube API Configuration
   EXPO_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key

   # Audius Configuration
   EXPO_PUBLIC_AUDIUS_APP_NAME=streamly

   # App Configuration
   EXPO_PUBLIC_APP_ENV=development
   EXPO_PUBLIC_DEBUG_MODE=true
   ```

4. **Supabase Setup**

   - Create a new Supabase project
   - Run the database schema (see `types/database.ts`)
   - Copy your project URL and anon key to `.env`

5. **YouTube API Setup**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable YouTube Data API v3
   - Create credentials (API Key)
   - Copy the API key to `.env`

6. **Run the app**
   ```bash
   npx expo start
   ```

## 🗄️ Database Schema

The app uses Supabase with the following main tables:

- **users**: User profiles and preferences
- **tracks**: Music track information
- **playlists**: User-created playlists
- **playlist_tracks**: Playlist-track relationships
- **liked_tracks**: User track likes
- **listening_history**: User listening history

## 🎵 Audio Sources

### YouTube

- Search and trending videos
- Video metadata extraction
- _Note: Direct streaming requires additional services_

### Audius

- Decentralized music platform
- Direct streaming support
- Track metadata and artwork

## 🏗️ Project Structure

```
streamly/
├── app/                    # Expo Router screens
│   ├── (tabs)/           # Tab navigation screens
│   ├── (auth)/           # Authentication screens
│   └── ...               # Other screens
├── components/            # Reusable UI components
│   ├── player/           # Audio player components
│   ├── track/            # Track display components
│   └── ui/               # General UI components
├── context/               # React Context providers
├── services/              # API and external services
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── constants/             # App constants and theme
├── utils/                 # Utility functions
└── assets/                # Images, fonts, etc.
```

## 🔧 Development

### Available Scripts

- `npx expo start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run web version
- `npm run deploy` - Deploy to web

### Code Style

- **TypeScript** for type safety
- **Functional Components** with hooks
- **Consistent naming** conventions
- **Component composition** over inheritance
- **Error boundaries** and proper error handling

### Testing

_Testing setup will be added as the project develops_

## 🎯 Current Implementation Status

### ✅ **Completed Components**

- **Audio Service** - Full Expo AV integration with playback controls
- **Player Context** - State management for audio playback
- **Mini Player** - Bottom screen player with controls
- **Progress Bar** - Interactive seeking functionality
- **Navigation** - Tab-based layout with smooth transitions
- **Theme System** - SiriusXM-inspired design with consistent colors
- **Error Handling** - Comprehensive error states and user feedback

### 🚧 **In Development**

- **Search Results** - Real data integration and track display
- **Library Screen** - User playlists and saved content
- **Profile Management** - User settings and preferences

### 📋 **Next Priorities**

1. **Complete UI/UX** - Finish remaining screens and polish
2. **Stream URL Resolution** - Make audio actually playable
3. **Database Integration** - User data and playlist management

## 🚨 Known Issues

1. **YouTube Streaming**: Direct stream URLs are not yet implemented
2. **Audio Permissions**: May need manual permission granting on some devices
3. **Background Playback**: Limited on some Android devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo** team for the amazing development platform
- **Supabase** for the backend infrastructure
- **SiriusXM** for design inspiration
- **React Native** community for the framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Join our [Discord](link-to-discord) community

---

**Made with ❤️ by the Streamly team**

_Last updated: December 2024_
