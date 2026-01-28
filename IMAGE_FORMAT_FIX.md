# Image Format Issue - AVIF not supported in React Native

## Problem
React Native doesn't support AVIF image format natively. Your images are in `.avif` format, which causes the app to crash.

## Solutions

### Option 1: Convert Images Online (RECOMMENDED - Fastest)

1. **Go to one of these free converters:**
   - https://avif.io/ 
   - https://squoosh.app/
   - https://convertio.co/avif-png/

2. **Upload your AVIF files:**
   - shoes1.avif through shoes6.avif
   
3. **Convert to PNG or JPG format**

4. **Replace the files** in `src/assets/images/`

5. **Update `images.tsx`:**
```typescript
export const images = {
    shoes1: require('./shoes1.png'),
    shoes2: require('./shoes2.png'),
    shoes3: require('./shoes3.png'),
    shoes4: require('./shoes4.png'),
    shoes5: require('./shoes5.png'),
    shoes6: require('./shoes6.png'),
}
```

### Option 2: Use ImageMagick (Command Line)

If you have Homebrew:

```bash
# Install ImageMagick
brew install imagemagick

# Navigate to images folder
cd src/assets/images/

# Convert all AVIF to PNG
for file in *.avif; do convert "$file" "${file%.avif}.png"; done

# Delete AVIF files after conversion
rm *.avif
```

Then update `images.tsx` to use `.png` extension.

### Option 3: Use Online URLs (Temporary)

If you want to test quickly, you can use URLs instead:

```typescript
export const images = {
    shoes1: { uri: 'https://your-hosted-image-url.com/shoes1.png' },
    shoes2: { uri: 'https://your-hosted-image-url.com/shoes2.png' },
    // etc...
}
```

## Why AVIF Doesn't Work

- **AVIF** is a modern image format (like WebP)
- React Native's native image components don't support AVIF
- You need PNG, JPG, or WebP for React Native

## Recommended Format

**Use PNG** for best quality and compatibility:
- ✅ Supported on iOS and Android
- ✅ Supports transparency
- ✅ Good quality
- ✅ Well-supported

## Quick Steps (5 minutes)

1. Open https://avif.io/
2. Drag all 6 AVIF files
3. Select "Convert to PNG"
4. Download converted files
5. Replace files in `src/assets/images/`
6. Update `images.tsx` to use `.png`
7. Restart Metro bundler: `npm start -- --reset-cache`
8. Run app again: `npm run android` or `npm run ios`

## After Converting

Make sure to restart Metro with cache reset:

```bash
# Stop current Metro bundler (Ctrl+C)

# Clear cache and restart
npm start -- --reset-cache

# In another terminal, run your app
npm run android  # or npm run ios
```

---

**Once converted, your app will work perfectly! 🎉**
