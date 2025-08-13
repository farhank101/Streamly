# Home Images Setup Guide

This directory contains all the local images used in your Streamly app's home screen and explore sections.

## Directory Structure

```
assets/images/home/
├── genres/          # Music genre images
├── moods/           # Mood-based playlist images
├── artists/         # Artist profile images
├── playlists/       # Playlist cover images
├── podcasts/        # Podcast cover images
├── albums/          # Album cover images
└── index.ts         # Image mapping configuration
```

## Required Images

### Genres (Required for Explore screen)

- `hiphop.jpg` - Hip-hop genre image
- `dance_electro.jpg` - Dance/Electronic genre image
- `pop.jpg` - Pop genre image
- `country.jpg` - Country genre image
- `rock.jpg` - Rock genre image
- `indie.jpg` - Indie genre image
- `latin.jpg` - Latin genre image
- `kpop.jpg` - K-pop genre image
- `metal.jpg` - Metal genre image
- `radio.jpg` - Radio genre image
- `progressive.jpg` - Progressive genre image

### Moods (Required for Explore screen)

- `party.jpg` - Party mood image
- `chill.jpg` - Chill/Relaxed mood image
- `workout.jpg` - Workout/Energy mood image
- `romance.jpg` - Romantic mood image
- `sleep.jpg` - Sleep/Calm mood image
- `comedy.jpg` - Comedy mood image
- `family.jpg` - Family-friendly mood image
- `travel.jpg` - Travel mood image

### Home Screen Content (Optional)

- `queen.jpg` - Queen artist image
- `rock70s.jpg` - 70s Rock playlist image
- `deep_focus.jpg` - Deep Focus playlist image
- `productive_morning.jpg` - Productive Morning playlist image
- `white_noise.jpg` - White Noise playlist image
- And many more... (see `index.ts` for complete list)

## Image Requirements

- **Format**: JPG or PNG
- **Aspect Ratio**: Square (1:1) recommended
- **Size**: 400x400px minimum, 800x800px ideal
- **File Size**: Keep under 500KB for performance
- **Quality**: High quality, clear images

## How to Add Images

1. **Place your image files** in the appropriate subdirectory
2. **Name them exactly** as shown in the list above
3. **Restart your app** - the images will load automatically

## Example

To add a hip-hop genre image:

1. Save your hip-hop image as `hiphop.jpg`
2. Place it in `assets/images/home/genres/hiphop.jpg`
3. Restart the app
4. The Explore screen will now show your image instead of the placeholder

## Fallback System

If an image is missing:

- The app will show a default placeholder image
- No errors will occur
- You can add the image later and it will work immediately

## Troubleshooting

**Images not showing?**

- Check the file name matches exactly (case-sensitive)
- Ensure the file is in the correct subdirectory
- Restart the app after adding images
- Check the file format (JPG/PNG)

**App crashes when loading images?**

- Verify image files are valid and not corrupted
- Check file sizes aren't too large
- Ensure images are in supported formats

## Need Help?

If you're having trouble with images:

1. Check the console for error messages
2. Verify file paths and names
3. Try with a simple test image first
4. Restart the development server
