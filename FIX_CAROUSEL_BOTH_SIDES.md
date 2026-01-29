# Fix: Show Both Left and Right Side Cards in Carousel

## Problem
Only the right side card was visible, not the left side card.

## Root Cause
The carousel needs proper centering and offset configuration to show cards on both sides of the center card.

## Solution Applied

### 1. Wrapped Carousel in Container
Added a centered container view:
```tsx
<View style={styles.carouselContainer}>
  <Carousel ... />
</View>
```

With style:
```typescript
carouselContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
```

### 2. Adjusted Card Width
Changed from `width * 0.75` to `width * 0.7` (70% of screen)
- Slightly smaller cards allow more visibility of side cards
- Better balance between center and side cards

### 3. Increased Parallax Offset
Changed from `50` to `80`:
```typescript
modeConfig={{
  parallaxScrollingScale: 0.75,
  parallaxScrollingOffset: 80, // ← Increased from 50
}}
```

This creates more spacing between cards, ensuring both left and right cards are visible.

## New Configuration

```typescript
<Carousel
  width={width * 0.7}           // 70% of screen width
  mode="parallax"
  modeConfig={{
    parallaxScrollingScale: 0.75, // Side cards at 75% size
    parallaxScrollingOffset: 80,  // 80px offset for spacing
  }}
  style={{ width: width }}       // Full width container
/>
```

## Result

Now you'll see:
- ✅ **Left Card**: Visible on the left at 75% scale
- ✅ **Center Card**: Fully visible at 100% scale (focused)
- ✅ **Right Card**: Visible on the right at 75% scale

## Why This Works

1. **Centered Container**: The `carouselContainer` centers the carousel, ensuring equal space on both sides
2. **Proper Width**: 70% card width leaves 15% space on each side for adjacent cards
3. **Increased Offset**: 80px offset pushes side cards further out, making them more visible
4. **Full Width Style**: The carousel itself takes full width while items are 70%

## Fine-Tuning

If you still don't see the left card clearly:

### Option 1: Make cards even smaller
```typescript
width={width * 0.65}  // 65% instead of 70%
```

### Option 2: Increase offset more
```typescript
parallaxScrollingOffset: 100  // 100px instead of 80
```

### Option 3: Make side cards smaller
```typescript
parallaxScrollingScale: 0.7  // 70% instead of 75%
```

## Test
Reload the app and you should now see all three cards:
- One on the left (small)
- One in center (large, focused)
- One on the right (small)
