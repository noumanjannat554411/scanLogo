# Carousel Exact Dimensions Specification

## Precise Measurements

### Active (Center) Card:
- **Width**: 270px
- **Height**: 396px
- **Scale**: 100% (1.0)
- **Border**: 2px white (rgba(255, 255, 255, 0.2))
- **Overlay**: None (bright and clear)

### Inactive (Side) Cards:
- **Width**: 135px (50% of center card)
- **Height**: 199px (50% of center card)
- **Scale**: 50% (0.5)
- **Visible Width**: 70px (only this portion is visible on each side)
- **Overlay**: 50% black (rgba(0, 0, 0, 0.5))

### Spacing & Layout:
- **Gap between cards**: 22.45px
- **Total visible width**: 270 + (70 × 2) + (22.45 × 2) = 454.9px
- **Scale Ratio**: 135 ÷ 270 = 0.5 (50%)

## Mathematical Breakdown

### Carousel Width Calculation:
```
Total Width = Center Card + Left Visible + Right Visible + Gaps
            = 270 + 70 + 70 + 22.45 + 22.45
            = 454.9px
```

### Parallax Offset Calculation:
```
Offset = Visible Side Width + Gap
       = 70 + 22.45
       = 92.45px
```

### Scale Calculation:
```
Scale = Inactive Width ÷ Active Width
      = 135 ÷ 270
      = 0.5 (50%)
```

## Carousel Configuration

```typescript
<Carousel
  width={270 + (70 * 2) + (22.45 * 2)}  // 454.9px total
  height={396}                           // Fixed height
  mode="parallax"
  modeConfig={{
    parallaxScrollingScale: 0.5,         // 50% scale for sides
    parallaxScrollingOffset: 92.45,      // 70px + 22.45px
  }}
/>
```

## Card Styles

```typescript
productCard: {
  width: 270,        // Exact active card width
  height: 396,       // Exact active card height
  borderRadius: 24,
  // ... other styles
}
```

## Visual Layout

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   [70px]  [22.45]  [ 270px CENTER ]  [22.45]  [70px]│
│   Left     Gap      Active Card      Gap     Right │
│   Side              (270x396)                Side  │
│  (135x199)                                  (135x199)│
│   50%                                         50%   │
│  Overlay                                    Overlay │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Card States by Position

### Left Side Card (Inactive):
- Size: 135px × 199px (50% scale)
- Visible: 70px on the right edge
- Hidden: 65px on the left edge (off-screen)
- Overlay: 50% black
- Gap to center: 22.45px

### Center Card (Active):
- Size: 270px × 396px (100% scale)
- Fully visible
- White border: 2px
- No overlay
- Gaps: 22.45px on each side

### Right Side Card (Inactive):
- Size: 135px × 199px (50% scale)
- Visible: 70px on the left edge
- Hidden: 65px on the right edge (off-screen)
- Overlay: 50% black
- Gap to center: 22.45px

## Transformation Details

### When swiping right (bringing left card to center):
1. **Left card** transitions:
   - Scale: 0.5 → 1.0 (135×199 → 270×396)
   - Position: Left → Center
   - Overlay: Fades from 50% → 0%
   - Border: Fades in (0 → 2px white)

2. **Center card** transitions:
   - Scale: 1.0 → 0.5 (270×396 → 135×199)
   - Position: Center → Right
   - Overlay: Fades from 0% → 50%
   - Border: Fades out (2px → 0)

3. **New card** appears on left:
   - Initial: 135×199, 50% overlay
   - Only 70px visible

### When swiping left (bringing right card to center):
1. **Right card** transitions:
   - Scale: 0.5 → 1.0 (135×199 → 270×396)
   - Position: Right → Center
   - Overlay: Fades from 50% → 0%
   - Border: Fades in (0 → 2px white)

2. **Center card** transitions:
   - Scale: 1.0 → 0.5 (270×396 → 135×199)
   - Position: Center → Left
   - Overlay: Fades from 0% → 50%
   - Border: Fades out (2px → 0)

3. **New card** appears on right:
   - Initial: 135×199, 50% overlay
   - Only 70px visible

## Aspect Ratio

### Active Card:
- Ratio: 270:396 = 0.682 (roughly 2:3)
- Portrait orientation

### Inactive Card:
- Ratio: 135:199 = 0.678 (maintains same aspect ratio)
- Proportional scaling

## Implementation Summary

```typescript
// Exact dimensions
const ACTIVE_CARD_WIDTH = 270;
const ACTIVE_CARD_HEIGHT = 396;
const INACTIVE_CARD_WIDTH = 135;   // 50% of active
const INACTIVE_CARD_HEIGHT = 199;  // 50% of active
const SIDE_VISIBLE_WIDTH = 70;
const CARD_GAP = 22.45;

// Calculated values
const CAROUSEL_WIDTH = ACTIVE_CARD_WIDTH + (SIDE_VISIBLE_WIDTH * 2) + (CARD_GAP * 2);
const PARALLAX_OFFSET = SIDE_VISIBLE_WIDTH + CARD_GAP;
const SCALE_RATIO = INACTIVE_CARD_WIDTH / ACTIVE_CARD_WIDTH;
```

## Result

The carousel now displays:
- ✅ Center card: Exactly 270×396px
- ✅ Side cards: Exactly 135×199px (50% scale)
- ✅ Side visibility: Exactly 70px of each side card visible
- ✅ Gap: Exactly 22.45px between cards
- ✅ Smooth transitions with precise scaling
- ✅ Perfect alignment and centering
