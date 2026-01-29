# Fix: Balance Left and Right Card Visibility

## Problem
The right card was more visible than the left card in the carousel.

## Root Cause
The carousel wasn't perfectly centered, causing an asymmetric display of side cards.

## Solutions Applied

### 1. Adjusted Card Width
Changed from `width * 0.7` back to `width * 0.75`:
- Better balance for side card visibility
- More consistent spacing on both sides

### 2. Increased Parallax Offset
Changed from `80` to `100`:
```typescript
modeConfig={{
  parallaxScrollingScale: 0.75,
  parallaxScrollingOffset: 100, // ← Increased for better side visibility
}}
```
- Pushes side cards further out
- Ensures both left and right are equally visible

### 3. Added Window Size
Added `windowSize={3}`:
```typescript
<Carousel
  windowSize={3}  // ← Renders 3 items at a time (left, center, right)
  ...
/>
```
- Explicitly tells carousel to render 3 items
- Ensures both adjacent items are visible and rendered

### 4. Updated Container Styling
```typescript
carouselContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: width,  // ← Explicit full width
}

carouselCard: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  // Removed paddingHorizontal to ensure perfect centering
}
```

## New Configuration

```typescript
<View style={styles.carouselContainer}>
  <Carousel
    width={width * 0.75}          // 75% card width
    windowSize={3}                 // Show 3 items (left, center, right)
    mode="parallax"
    modeConfig={{
      parallaxScrollingScale: 0.75,  // Side cards at 75% size
      parallaxScrollingOffset: 100,  // 100px offset for equal spacing
    }}
    style={{ width: width }}       // Full width container
  />
</View>
```

## Key Changes Explained

### windowSize={3}
- Forces the carousel to render and display exactly 3 items
- Ensures left and right cards are always present
- Critical for symmetric display

### parallaxScrollingOffset: 100
- Higher offset = more spacing between cards
- Ensures both side cards have equal visibility
- 100px provides good balance for most screen sizes

### Removed paddingHorizontal
- Padding was causing asymmetric spacing
- Now cards are perfectly centered
- Equal margins on both sides

## Expected Result

Now you should see:
- ✅ **Left Card**: Clearly visible at 75% scale with equal visibility to right
- ✅ **Center Card**: Fully visible at 100% scale (focused)
- ✅ **Right Card**: Clearly visible at 75% scale with equal visibility to left

## Symmetry Test
Both left and right cards should:
- Have the same scale (75%)
- Have the same distance from center
- Have the same level of visibility
- Scale up equally when swiped to center

## Further Adjustments (if needed)

### If left card is still less visible:
Try increasing offset even more:
```typescript
parallaxScrollingOffset: 120
```

### If you want more dramatic side cards:
Decrease the scale:
```typescript
parallaxScrollingScale: 0.7  // 70% instead of 75%
```

### If cards are too spread out:
Decrease offset:
```typescript
parallaxScrollingOffset: 80
```

## Testing
1. Reload the app
2. Check that left and right cards have equal visibility
3. Swipe left/right to verify smooth transitions
4. Verify both sides scale up equally when brought to center
