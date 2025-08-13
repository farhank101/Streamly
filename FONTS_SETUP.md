# Font Setup Guide for Streamly

This guide will help you set up the **Oswald (SemiBold)** and **Inter (Regular)** font combination throughout your Streamly app.

## 🎯 **Font Combination**

- **Headings**: Oswald SemiBold - Clean, modern, and professional
- **Body Text**: Inter Regular - Highly readable and contemporary

## 📥 **Step 1: Download Fonts**

### **Oswald Font Family**

1. Go to [Google Fonts - Oswald](https://fonts.google.com/specimen/Oswald)
2. Download the font family
3. Extract the ZIP file
4. Copy these files to `assets/fonts/`:
   - `Oswald-Regular.ttf`
   - `Oswald-Medium.ttf`
   - `Oswald-SemiBold.ttf` ⭐ **Primary heading font**
   - `Oswald-Bold.ttf`

### **Inter Font Family**

1. Go to [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
2. Download the font family
3. Extract the ZIP file
4. Copy these files to `assets/fonts/`:
   - `Inter-Regular.ttf` ⭐ **Primary body font**
   - `Inter-Medium.ttf`
   - `Inter-SemiBold.ttf`
   - `Inter-Bold.ttf`

## 📁 **Step 2: Verify File Structure**

Your `assets/fonts/` directory should look like this:

```
assets/
└── fonts/
    ├── Oswald-Regular.ttf
    ├── Oswald-Medium.ttf
    ├── Oswald-SemiBold.ttf
    ├── Oswald-Bold.ttf
    ├── Inter-Regular.ttf
    ├── Inter-Medium.ttf
    ├── Inter-SemiBold.ttf
    └── Inter-Bold.ttf
```

## 🔧 **Step 3: Font Configuration**

The fonts are already configured in:

- `constants/fonts.ts` - Font definitions and styles
- `hooks/useFonts.ts` - Font loading hook
- `app/_layout.tsx` - Font loading integration

## 🎨 **Step 4: Usage in Components**

### **Typography System**

```typescript
import { TYPOGRAPHY } from '../constants/theme';

// Headings (Oswald SemiBold)
<Text style={[styles.title, TYPOGRAPHY.h1]}>Main Title</Text>
<Text style={[styles.subtitle, TYPOGRAPHY.h3]}>Subtitle</Text>

// Body Text (Inter Regular)
<Text style={[styles.description, TYPOGRAPHY.body]}>Description text</Text>
<Text style={[styles.caption, TYPOGRAPHY.bodySmall]}>Small text</Text>

// Buttons (Inter SemiBold/Medium)
<Text style={[styles.buttonText, TYPOGRAPHY.buttonPrimary]}>Button</Text>
```

### **Available Typography Styles**

#### **Headings (Oswald SemiBold)**

- `TYPOGRAPHY.h1` - 48px, tight line height
- `TYPOGRAPHY.h2` - 36px, tight line height
- `TYPOGRAPHY.h3` - 32px, tight line height
- `TYPOGRAPHY.h4` - 28px, tight line height
- `TYPOGRAPHY.h5` - 24px, tight line height
- `TYPOGRAPHY.h6` - 20px, tight line height

#### **Body Text (Inter Regular)**

- `TYPOGRAPHY.bodyLarge` - 18px, relaxed line height
- `TYPOGRAPHY.body` - 16px, relaxed line height
- `TYPOGRAPHY.bodySmall` - 14px, relaxed line height
- `TYPOGRAPHY.bodyXs` - 12px, relaxed line height

#### **Buttons (Inter SemiBold/Medium)**

- `TYPOGRAPHY.buttonPrimary` - 16px, semi-bold, wide letter spacing
- `TYPOGRAPHY.buttonSecondary` - 16px, medium weight
- `TYPOGRAPHY.buttonSmall` - 14px, medium weight

#### **Utility Text**

- `TYPOGRAPHY.caption` - 12px, regular weight
- `TYPOGRAPHY.label` - 14px, medium weight

## 🚀 **Step 5: Test the Fonts**

1. **Start the app**: `npx expo start`
2. **Check font loading**: You should see "Loading fonts..." briefly
3. **Verify typography**: All text should use the new fonts
4. **Check different screens**: Splash, Login, Register, etc.

## 🔍 **Step 6: Troubleshooting**

### **Fonts Not Loading**

- Check file paths in `assets/fonts/`
- Verify file names match exactly
- Restart the Metro bundler
- Clear Expo cache: `npx expo start --clear`

### **Fallback to System Fonts**

- The app will automatically fallback to system fonts if loading fails
- Check console for font loading errors
- Verify font files are valid TTF files

### **Performance Issues**

- Fonts are loaded once at app startup
- Large font files may increase app size
- Consider using variable fonts for better performance

## 📱 **Step 7: Platform-Specific Considerations**

### **iOS**

- Fonts work out of the box
- No additional configuration needed

### **Android**

- Fonts work out of the box
- No additional configuration needed

### **Web**

- Fonts are loaded via CSS
- May need additional web font configuration

## 🎨 **Design Benefits**

### **Oswald SemiBold for Headings**

- **Professional appearance** - Clean, geometric design
- **Excellent readability** - Clear at all sizes
- **Modern aesthetic** - Contemporary and sophisticated
- **Brand consistency** - Perfect for app titles and headers

### **Inter Regular for Body Text**

- **Superior legibility** - Designed for screen reading
- **Versatile usage** - Works well in all contexts
- **Professional feel** - Used by major tech companies
- **Excellent spacing** - Optimized character spacing

## 🔄 **Updating Existing Components**

To update existing components to use the new typography system:

1. **Import TYPOGRAPHY**:

   ```typescript
   import { TYPOGRAPHY } from "../constants/theme";
   ```

2. **Replace hardcoded styles**:

   ```typescript
   // Before
   <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Title</Text>

   // After
   <Text style={[styles.title, TYPOGRAPHY.h4]}>Title</Text>
   ```

3. **Remove font properties** from StyleSheet:
   ```typescript
   // Remove these from styles
   fontSize: 24,
   fontWeight: 'bold',
   ```

## ✨ **Result**

After following this guide, your Streamly app will have:

- **Professional typography** that matches top-tier apps
- **Consistent font usage** throughout the entire app
- **Better readability** and user experience
- **Modern, sophisticated appearance** that enhances your brand

## 🆘 **Need Help?**

If you encounter any issues:

1. Check the console for error messages
2. Verify font file integrity
3. Restart the development server
4. Clear all caches and try again

---

**Happy Typography! 🎨✨**
