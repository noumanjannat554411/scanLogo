# Scaling Building Models for AR

## Problem
The building GLB models are too large when viewed in AR, making them difficult to see and interact with.

## Solution Options

### Option 1: Pre-scale GLB Files (Recommended)
Scale down the GLB files before uploading to Firebase. This ensures they display at a reasonable size for all users.

**Using Blender:**
1. Download the GLB file
2. Open in Blender (File → Import → glTF 2.0)
3. Select the model (press 'A' to select all)
4. Press 'S' for scale, then type `0.1` and press Enter (scales to 10%)
5. File → Export → glTF 2.0 (.glb)
6. Re-upload to Firebase Storage

**Using Online Tools:**
- https://products.aspose.app/3d/scaling - Free online 3D model scaler
- https://www.creators3d.com/online-viewer - View and adjust scale

### Option 2: User Scaling (Current Implementation)
The app now includes `resizable=true` parameter, allowing users to:
- **Pinch to scale** the building up or down in AR
- **Drag with two fingers** to rotate
- **Tap and drag** to move the model

### Option 3: Modify GLB URLs with Scale Metadata
Add scale information to your Firebase model metadata:

```javascript
// In your data file (e.g., logoData.ts)
{
  id: 'bechtel',
  name: 'Bechtel Corporation',
  modelUrl: 'https://firebasestorage.googleapis.com/...',
  modelScale: 0.1, // 10% of original size
  // ... other properties
}
```

Then modify the code to apply scale hints (requires custom AR viewer implementation).

### Option 4: Add Scale Slider to App
Create a pre-AR settings screen where users can choose the desired model size before launching AR.

## Current Configuration

The app is configured with:
- `resizable=true` - Users can pinch to scale
- `enable_vertical_placement=true` - Can place on walls/vertical surfaces
- `mode=ar_only` - Direct to AR mode

## Recommended Model Sizes

For building models in AR:
- **Ideal scale**: 10-20% of real-world size (0.1 - 0.2 scale factor)
- **Bounding box**: Should fit within 2-3 meters for comfortable viewing
- **File size**: Keep GLB under 5MB for fast loading

## Testing

After scaling:
1. Scan a construction company logo
2. Tap on detected surface in AR
3. Model should appear at viewable size
4. Use pinch gesture to adjust if needed

## Firebase Model Locations

Current models in Firebase Storage:
- Bechtel: `building-models/bechtel_building.glb`
- Turner: `building-models/turner_building.glb`
- Skanska: `building-models/skanska_building.glb`
- Fluor: `building-models/fluor_building.glb`

Replace these files with scaled versions for best results.
