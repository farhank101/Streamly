# Streamly Documentation

Welcome to the Streamly documentation directory. This contains comprehensive guides and information about various aspects of the app.

## 📚 Available Documentation

### 🎵 **API Integration Guides**

#### [Spotify Integration](./SPOTIFY_INTEGRATION.md)
Complete guide for integrating Spotify API into Streamly:
- API setup and authentication
- Artist image fetching
- Track and album metadata
- Batch operations and fallback systems

#### [YouTube Integration](./YOUTUBE_INTEGRATION.md)
Guide for YouTube Data API v3 integration:
- Search functionality
- Video metadata extraction
- Stream URL resolution
- API key configuration

### 🎨 **App Development Guides**

#### [Genre Implementation](./GENRE_IMPLEMENTATION.md)
Comprehensive guide for adding and managing music genres:
- Genre data structure
- Adding new genres
- Content organization
- UI implementation

#### [Font Setup](./FONTS_SETUP.md)
Complete typography system guide:
- Font installation
- Typography configuration
- Component usage examples
- Design system guidelines

### 📊 **Feature Documentation**

#### [Artist Integration Summary](./ARTIST_INTEGRATION_SUMMARY.md)
Overview of the unified artist system:
- 440+ artists (Bollywood + Hip-Hop)
- Genre filtering and sorting
- Artist categorization and tiers
- Integration with home screen and genre pages

## 🚀 Quick Start

1. **Setup Environment**: Follow the main [README.md](../README.md) for initial setup
2. **API Configuration**: Configure your API keys in `.env`
3. **Font Setup**: Follow [Font Setup](./FONTS_SETUP.md) for typography
4. **Genre Management**: Use [Genre Implementation](./GENRE_IMPLEMENTATION.md) for adding genres
5. **Artist Data**: Follow [Spotify Integration](./SPOTIFY_INTEGRATION.md) for artist images

## 🔧 Development Workflow

### Adding New Features
1. Check existing documentation for similar implementations
2. Follow established patterns and structures
3. Update relevant documentation
4. Test thoroughly before committing

### Updating Documentation
- Keep documentation current with code changes
- Include code examples and usage patterns
- Document any breaking changes
- Maintain consistent formatting and structure

## 📁 Project Structure

```
streamly/
├── docs/                   # 📚 This directory
│   ├── README.md          # Documentation overview
│   ├── SPOTIFY_INTEGRATION.md
│   ├── YOUTUBE_INTEGRATION.md
│   ├── GENRE_IMPLEMENTATION.md
│   ├── FONTS_SETUP.md
│   └── ARTIST_INTEGRATION_SUMMARY.md
├── app/                    # Expo Router pages
├── components/             # Reusable UI components
├── constants/              # App constants and data
├── services/               # API and business logic
├── scripts/                # Utility scripts
└── README.md               # Main project README
```

## 🤝 Contributing

When adding new documentation:
1. Use clear, descriptive titles
2. Include practical examples
3. Follow the existing format and style
4. Update this README.md to include new files
5. Test any code examples provided

## 📞 Support

For questions about specific documentation:
- Check the relevant guide first
- Look for similar implementations in the codebase
- Refer to the main [README.md](../README.md) for setup issues
- Check the [scripts](../scripts/) directory for utility tools
