# 3D Coverflow Carousel - Multi-Card View Settings

## Updated Configuration

### Key Changes for Showing Multiple Cards:

1. **Card Width**: Changed from `width` to `width * 0.75` (75% of screen width)
   - This allows side cards to be visible
   - Center card takes 75% of screen space
   - Side cards peek from left and right

2. **Parallax Scale**: Changed from `0.88` to `0.75`
   - Side cards scale to 75% of center card size
   - Creates more dramatic size difference
   - Center card appears more prominent

3. **Parallax Offset**: Changed from `60` to `50`
   - Slight adjustment for better spacing
   - Cards overlap less, clearer visibility

4. **Animation Duration**: Increased from `400ms` to `500ms`
   - Slightly slower, smoother transitions
   - Better visibility of scale animation

5. **Card Styling**:
   - Width: `'100%'` (relative to carousel item width)
   - Added `paddingHorizontal: 10` for spacing between cards
   - Enhanced shadows for better depth perception

## Visual Effect

### Before:
- Only one card visible at a time
- Cards were full screen width

### After:
- **Center Card**: 100% scale, fully focused, prominent
- **Left Side Card**: 75% scale, partially visible on left
- **Right Side Card**: 75% scale, partially visible on right
- **Smooth Transition**: Cards scale up from 75% → 100% when brought to center
- **Peek Effect**: You can see the next/previous cards on both sides

## How It Works:

1. **Swipe Left**: 
   - Right card moves to center (scales 75% → 100%)
   - Center card moves to left (scales 100% → 75%)
   - New card appears on right at 75% scale

2. **Swipe Right**: 
   - Left card moves to center (scales 75% → 100%)
   - Center card moves to right (scales 100% → 75%)
   - New card appears on left at 75% scale

## Fine-Tuning Options

### To show MORE of side cards:
- Decrease `width`: Try `width * 0.65` or `width * 0.70`

### To make side cards SMALLER:
- Decrease `parallaxScrollingScale`: Try `0.65` or `0.70`

### To increase spacing between cards:
- Increase `parallaxScrollingOffset`: Try `60` or `70`
- Increase `paddingHorizontal`: Try `15` or `20`

### For faster animations:
- Decrease `scrollAnimationDuration`: Try `300` or `350`

### For smoother animations:
- Increase `scrollAnimationDuration`: Try `600` or `700`

## Current Settings Summary:
```typescript
width: width * 0.75          // 75% of screen width
parallaxScrollingScale: 0.75 // Side cards at 75% size
parallaxScrollingOffset: 50  // 50px spacing offset
scrollAnimationDuration: 500 // 500ms smooth animation
paddingHorizontal: 10        // 10px spacing between cards
```

## Result:
You now have a beautiful 3D coverflow carousel where:
- ✅ You can see 3 cards at once (left, center, right)
- ✅ Side cards are smaller (75% scale)
- ✅ Center card is prominent (100% scale)
- ✅ Smooth scale-up animation when cards come into focus
- ✅ Clear peek effect showing next/previous products
