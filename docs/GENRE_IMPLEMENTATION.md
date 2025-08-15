# Genre Implementation Guide

This guide explains how to implement comprehensive genre detail pages for all music genres in the Streamly app, matching the design shown in the reference image.

## Current Implementation

The app now has a complete genre detail page system with:

- **Navigation Tabs**: OVERVIEW, PLAYLISTS, NEW RELEASES, ARTISTS
- **Content Sections**: Popular content, playlists, new releases, and artists
- **Responsive Design**: Horizontal scrolling cards with proper spacing
- **Interactive Elements**: Play buttons, like counts, and navigation

## File Structure

```
app/
├── category/
│   └── [id].tsx          # Genre detail page
constants/
├── genreData.ts          # Genre data definitions
scripts/
└── add-genre.js          # Helper script for adding genres
```

## How to Add New Genres

### 1. Update the Genre Data

Add your new genre to `constants/genreData.ts`:

```typescript
export const genreData: Record<string, GenreData> = {
  // ... existing genres ...

  new_genre_id: {
    name: "GENRE_NAME",
    color: "#HEX_COLOR",
    popular: [
      { id: "1", title: "Workout Genre", image: "...", likes: "123,456" },
      { id: "2", title: "Love Genre", image: "...", likes: "78,901" },
      { id: "3", title: "Genre Essentials", image: "...", likes: "234,567" },
    ],
    playlists: [
      { id: "1", title: "Top Genre", image: "...", likes: "345,678" },
      { id: "2", title: "Genre Legends", image: "...", likes: "123,456" },
      { id: "3", title: "Modern Genre", image: "...", likes: "234,567" },
    ],
    newReleases: [
      {
        id: "1",
        title: "Album Title",
        artist: "Artist Name",
        image: "...",
        releaseDate: "Album release: DD/MM/YY",
      },
      // ... more releases
    ],
    artists: [
      { id: "1", name: "Artist Name", image: "...", likes: "456K" },
      // ... more artists
    ],
  },
};
```

### 2. Use the Helper Script

Run the helper script to generate a template:

```bash
node scripts/add-genre.js
```

This will generate a template you can copy and customize.

### 3. Update Home Screen Navigation

In `app/(tabs)/index.tsx`, add your genre to the genres grid:

```typescript
{
  [
    // ... existing genres ...
    { id: "new_genre_id", name: "GENRE_NAME", imageKey: "genre_genre_name" },
  ].map((genre) => (
    <TouchableOpacity
      key={genre.id}
      style={styles.genreCardCompact}
      activeOpacity={0.8}
      onPress={() => router.push(`/category/${genre.id}`)}
    >
      // ... rest of the component
    </TouchableOpacity>
  ));
}
```

### 4. Add Genre Images

Add your genre images to `assets/images/home/genres/` and update the `homeImages/index.ts` file:

```typescript
export const genre_genre_name = require("./genres/genre_name.png");
```

## Genre Data Structure

Each genre follows this structure:

```typescript
interface GenreData {
  name: string; // Display name (e.g., "ROCK")
  color: string; // Hex color for theming
  popular: GenreContent[]; // Popular content items
  playlists: GenrePlaylist[]; // Playlist items
  newReleases: GenreNewRelease[]; // New album releases
  artists: GenreArtist[]; // Featured artists
}
```

### Content Types

#### Popular Content

- Workout playlists
- Love/mood playlists
- Essential collections

#### Playlists

- Top genre playlists
- Genre legends
- Modern genre content

#### New Releases

- Recent album releases
- Artist information
- Release dates

#### Artists

- Featured genre artists
- Like counts
- Circular profile images

## Design Guidelines

### Colors

- Use consistent color schemes for each genre
- Ensure good contrast with text
- Follow the app's color palette

### Images

- Use placeholder images for development
- Replace with actual genre-specific artwork
- Maintain consistent aspect ratios

### Typography

- Use the app's font system (Inter family)
- Maintain hierarchy with different font weights
- Ensure readability on all screen sizes

## Example Implementation

The Rock genre is fully implemented as an example:

```typescript
export const rockGenreData: GenreData = {
  name: "ROCK",
  color: "#FECA57",
  popular: [
    { id: "1", title: "Workout Rock", image: "...", likes: "454,228" },
    { id: "2", title: "Love Rock", image: "...", likes: "93,264" },
    { id: "3", title: "Rockabilly", image: "...", likes: "82,125" },
  ],
  // ... rest of the data
};
```

## Testing

1. Navigate to the home screen
2. Tap on a genre card
3. Verify the genre detail page loads
4. Test all navigation tabs
5. Verify content displays correctly
6. Test horizontal scrolling
7. Verify responsive design

## Future Enhancements

- **Real API Integration**: Replace placeholder data with real music API calls
- **Dynamic Content**: Load content based on user preferences
- **Personalization**: Show user-specific recommendations
- **Offline Support**: Cache genre data for offline viewing
- **Analytics**: Track user engagement with different genres

## Troubleshooting

### Common Issues

1. **Genre not displaying**: Check the ID mapping in the home screen
2. **Images not loading**: Verify image paths and require statements
3. **Navigation errors**: Ensure route parameters match genre IDs
4. **Styling issues**: Check theme constants and font imports

### Debug Tips

- Use console.log to verify data flow
- Check React Native debugger for component state
- Verify all imports are correct
- Test on different screen sizes

## Support

For questions or issues with genre implementation:

1. Check this documentation
2. Review the example Rock genre implementation
3. Use the helper script for consistent formatting
4. Follow the established patterns in the codebase

---

**Note**: This implementation provides a solid foundation for genre detail pages. You can extend it with additional features like search, filtering, and more interactive elements as needed.
