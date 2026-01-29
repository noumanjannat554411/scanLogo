# 3D Models Directory

This directory contains GLB (GL Transmission Format Binary) files for 3D product models used in AR view.

## How to Add Your GLB Models

1. **Place your GLB files here** with these names:
   - `shoe1.glb` - Air Jordan 1 Mid
   - `shoe2.glb` - Air Jordan 1 Retro Low OG
   - `shoe3.glb` - Air Jordan 1 Triple Stack
   - `shoe4.glb` - Air Jordan 1 Low
   - `shoe5.glb` - Air Jordan 1 Mid (Women's)
   - `shoe6.glb` - Air Jordan 1 Mid SE

2. **Uncomment the import** in `models.ts`:
   ```typescript
   // Currently commented out - uncomment when you add .glb files
   export const models = {
       shoe1: require('./shoe1.glb'),
       // ... etc
   };
   ```

3. **Update data.tsx** to use local models:
   ```typescript
   import { models } from "../../models/models";
   
   // In product object:
   modelUrl: models.shoe1  // Instead of URL
   ```

## Where to Get GLB Models

- **Sketchfab**: https://sketchfab.com (download free models)
- **TurboSquid**: https://www.turbosquid.com
- **CGTrader**: https://www.cgtrader.com
- **Nike/Jordan**: Check if they provide official 3D assets
- **Create Your Own**: Use Blender to convert/create models

## Model Requirements

- Format: `.glb` (not `.gltf` with separate files)
- Size: Keep under 5MB for best performance
- Optimization: Use tools like gltf-pipeline to compress
- Center Origin: Model should be centered at origin (0,0,0)
- Scale: Reasonable size (around 1 unit = 1 meter)

## Testing

Currently using demo models from:
- https://modelviewer.dev/shared-assets/models/

Replace these with your shoe models for the actual AR experience.

## AR Features

Once you add your GLB files, users can:
- View 3D model with touch controls (rotate, zoom)
- Enter AR mode (iOS ARKit / Android ARCore)
- Place virtual shoes on real surfaces
- Walk around the model in their space
- Take photos/videos with AR view
