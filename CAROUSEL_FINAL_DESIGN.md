# Carousel Design - Matching Reference Image

## Reference Image Analysis
Based on the provided screenshot, the carousel has these characteristics:
1. **Center card**: Large, prominent, with a subtle border/frame
2. **Side cards**: Smaller (about 70% size), darker/faded with overlay
3. **Spacing**: Cards overlap slightly, creating depth
4. **All cards visible**: Left, center, and right cards all shown
5. **Equal visibility**: Both side cards have similar visibility

## Implementation

### Key Configuration Changes

#### 1. Parallax Settings
```typescript
mode="parallax"
modeConfig={{
  parallaxScrollingScale: 0.88,        // Side cards at 88% size
  parallaxScrollingOffset: 50,         // Moderate spacing
  parallaxAdjacentItemScale: 0.7,      // Adjacent cards at 70% scale
}}
```

**Why these values:**
- `parallaxScrollingScale: 0.88` - Side cards slightly smaller but still clear
- `parallaxScrollingOffset: 50` - Balanced spacing, not too spread out
- `parallaxAdjacentItemScale: 0.7` - Creates the depth effect like in the image

#### 2. Active Card Border
```typescript
productCardActive: {
  borderWidth: 2,
  borderColor: 'rgba(255, 255, 255, 0.2)',
}
```
- Subtle white border on the focused/center card
- Matches the frame effect in the reference image

#### 3. Inactive Card Overlay
```typescript
inactiveCardOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: 24,
}
```
- Adds 50% dark overlay to non-active cards
- Makes side cards appear faded/darker
- Center card remains bright and prominent

#### 4. Dynamic Rendering
```typescript
renderItem={({ item: product, index }: { item: Product; index: number }) => (
  <View style={[
    styles.productCard,
    currentIndex === index && styles.productCardActive  // Border on active
  ]}>
    {/* Card content */}
    
    {/* Dark overlay on inactive cards */}
    {currentIndex !== index && (
      <View style={styles.inactiveCardOverlay} />
    )}
  </View>
)}
```

## Visual Effects Breakdown

### Center Card (Active):
- ✅ 100% scale (full size)
- ✅ Subtle white border
- ✅ No dark overlay
- ✅ Bright and prominent
- ✅ Full visibility of content

### Side Cards (Inactive):
- ✅ 88% scale initially
- ✅ 70% scale when adjacent
- ✅ 50% dark overlay (faded appearance)
- ✅ No border
- ✅ Partially visible, creating depth

## Comparison with Reference

| Feature | Reference Image | Implementation |
|---------|----------------|----------------|
| Center card size | Large, prominent | 100% scale ✓ |
| Center card border | Subtle frame | White border 2px ✓ |
| Side cards size | Smaller | 88%/70% scale ✓ |
| Side cards appearance | Darker/faded | 50% black overlay ✓ |
| Both sides visible | Yes | Yes ✓ |
| Smooth transitions | Yes | 500ms animation ✓ |
| Depth effect | Yes | Parallax mode ✓ |

## Card States

### When Swiping Left:
1. Right card moves to center: 70% → 88% → 100% scale, overlay fades out
2. Center card moves to left: 100% → 88% → 70% scale, overlay fades in
3. New card appears on right at 70% with overlay

### When Swiping Right:
1. Left card moves to center: 70% → 88% → 100% scale, overlay fades out
2. Center card moves to right: 100% → 88% → 70% scale, overlay fades in
3. New card appears on left at 70% with overlay

## Key Features Matching the Image

1. ✅ **Three cards visible** - Left, center, right all shown
2. ✅ **Center card prominent** - Larger with border
3. ✅ **Side cards faded** - Dark overlay creates depth
4. ✅ **Smooth scaling** - Natural size transitions
5. ✅ **Balanced layout** - Equal spacing on both sides
6. ✅ **Professional look** - Clean, modern design

## Final Settings Summary

```typescript
// Carousel
width: width (full screen width)
windowSize: 3 (render 3 items)
scrollAnimationDuration: 500 (smooth)

// Parallax
parallaxScrollingScale: 0.88
parallaxScrollingOffset: 50
parallaxAdjacentItemScale: 0.7

// Styling
Active card: 100% scale + white border
Inactive cards: 88%/70% scale + 50% dark overlay
```

## Result
The carousel now matches the reference image with:
- Large, bordered center card
- Smaller, darker side cards on both left and right
- Smooth transitions with proper depth effect
- Professional coverflow appearance
