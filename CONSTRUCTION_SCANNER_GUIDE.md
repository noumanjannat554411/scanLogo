# Construction Company AR Scanner - Implementation Guide

## Overview
This app has been transformed from a Nike/Ralph Lauren product scanner to a **Construction Company Logo Scanner** that detects construction company logos and displays their 3D building/project models with in-app AR viewing.

## Features

### 🏗️ Construction Company Detection
The app now detects logos from major construction companies:
- **Bechtel Corporation**
- **Turner Construction**
- **Skanska**
- **Fluor Corporation**

### 📱 In-App AR Viewing
- 3D models are displayed using Google's Model Viewer
- AR viewing happens **within the app** (no external navigation)
- Supports both iOS (AR Quick Look) and Android (Scene Viewer)
- Users can rotate, zoom, and view models in AR by tapping "View in AR"

## How It Works

### 1. Logo Scanning Flow
```
User opens scanner → Points at construction company logo → 
Google Vision API detects logo → App identifies company → 
Shows company's building projects → User selects project → 
Views 3D model → Taps "View in AR" → AR opens in-app
```

### 2. Key Components

#### **LogoScannerEnhanced.tsx**
- Updated to detect construction company logos
- UI changed to show "🏗️ Construction Scanner"
- Detection logic checks for: Bechtel, Turner, Skanska, Fluor
- Navigates to ProductDetails with company-specific projects

#### **construction-data.tsx** (NEW FILE)
- Contains all construction company project data
- Each company has multiple building projects
- Projects include: Office buildings, residential towers, hospitals, bridges, etc.
- 3D models sourced from public glTF repositories

#### **ARModelViewer.tsx**
- Uses Google Model Viewer for 3D rendering
- Supports direct URL loading of GLB models
- Built-in AR support (WebXR, AR Quick Look, Scene Viewer)
- Works entirely in-app via WebView

#### **ProductDetailsScreen.tsx**
- Displays carousel of building projects
- Shows project details: name, type, budget
- No changes needed - works with construction data

#### **ProductDetailFullScreen.tsx**
- Shows full project details
- "View in 3D" button opens ARModelViewer
- AR works in-app when user taps "View in AR" in the 3D viewer

## Data Structure

### Construction Project Object
```typescript
{
    id: number,
    image: ImageSource,              // Project image
    title: string,                   // "Modern Office Complex"
    price: string,                   // "$250M" (project budget)
    type: string,                    // "Commercial Building"
    url: string,                     // Company website
    modelUrl: string,                // Direct URL to GLB model
    modelLocalFile: any,             // Local fallback
    description: string              // Project description
}
```

## Using Custom 3D Models

### Option 1: Use Public GLB Models (Current)
The app currently uses models from the [Khronos glTF Sample Models repository](https://github.com/KhronosGroup/glTF-Sample-Models):
```typescript
modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb"
```

### Option 2: Host Your Own Models
1. Create or obtain GLB/GLTF models of buildings
2. Host them on:
   - GitHub
   - Firebase Storage
   - AWS S3
   - Any public CDN with CORS enabled
3. Update `modelUrl` in `construction-data.tsx`

### Option 3: Generate Models with AI
Use AI tools to generate 3D building models:
- **Tripo AI** (tripo3d.ai)
- **Meshy AI** (meshy.ai)
- **CSM AI** (csm.ai)
- **Luma AI** (lumalabs.ai)

Then host the generated GLB files.

### Model Requirements
- Format: **GLB** or **GLTF**
- Size: < 50MB for good performance
- Optimization: Use tools like gltf-pipeline to compress
- CORS: Ensure hosting allows cross-origin requests

## Adding New Construction Companies

### Step 1: Add Company Data
Edit `/src/assets/data/arrays/construction-data.tsx`:

```typescript
newcompany: [
    {
        id: 1,
        image: images.building1,
        title: "Project Name",
        price: "$150M",
        type: "Project Type",
        url: "https://company.com/",
        modelUrl: "https://your-cdn.com/building-model.glb",
        modelLocalFile: models.default,
        description: "Project description..."
    }
]
```

### Step 2: Update Detection Logic
Edit `/src/components/LogoScannerEnhanced.tsx`:

```typescript
// Around line 230, add new company detection
else if (desc.includes('yourcompany')) {
    detectedCompany = 'Your Company Name';
    companyProjects = constructionCompanies.newcompany;
    break;
}
```

### Step 3: Update Company List
In `construction-data.tsx`, add to `CONSTRUCTION_COMPANIES` array:
```typescript
export const CONSTRUCTION_COMPANIES = [
    'Bechtel',
    'Turner Construction',
    'Skanska',
    'Fluor',
    'Your Company Name'  // Add here
];
```

## Testing

### Test with Company Logos
1. Find/print logos of: Bechtel, Turner Construction, Skanska, Fluor
2. Open the app and start scanning
3. Point camera at logo
4. App should detect and show projects

### Test AR Functionality
1. Select any building project
2. Tap "View in 3D"
3. Wait for model to load
4. Tap "View in AR" button
5. Point phone at floor/surface
6. Place and interact with 3D model

### Supported Platforms
- **iOS**: Uses AR Quick Look (requires iOS 12+)
- **Android**: Uses Scene Viewer (requires ARCore support)

## Current 3D Models

The app currently uses placeholder models from glTF samples. You should replace these with actual building models:

| Company | Project Type | Current Model |
|---------|-------------|---------------|
| Bechtel | Office Complex | Box (placeholder) |
| Bechtel | Residential Tower | Helmet (placeholder) |
| Turner | Convention Center | Lantern (placeholder) |
| Skanska | Bridge | BrainStem (placeholder) |

**Recommendation**: Replace with realistic architectural models.

## Best Practices

### 3D Model Performance
- Keep models under 25MB for smooth loading
- Use texture compression
- Optimize polygon count (< 100K triangons)
- Test on mid-range devices

### Logo Detection
- Use high-quality company logos
- Ensure good lighting when scanning
- Keep logo in frame for 2-3 seconds
- Works best with printed logos or screens

### AR Experience
- Requires good lighting
- Works best on textured surfaces (avoid white walls)
- Device must support ARCore (Android) or ARKit (iOS)
- Minimum 2GB RAM recommended

## Troubleshooting

### Logo Not Detected
- Check Google Cloud Vision API key in `config.ts`
- Ensure good lighting
- Try moving closer/farther from logo
- Check console for API errors

### 3D Model Won't Load
- Verify `modelUrl` is accessible
- Check CORS settings on hosting
- Ensure GLB file is valid
- Check console for WebView errors

### AR Not Working
- Verify device supports AR (ARCore/ARKit)
- Check camera permissions
- Ensure you're pointing at a flat surface
- Try restarting the app

## Future Enhancements

### Phase 1 (Current)
- ✅ Construction company logo detection
- ✅ In-app AR viewing
- ✅ Multiple companies support
- ✅ Project carousels

### Phase 2 (Recommended)
- [ ] Add realistic building 3D models
- [ ] Add more construction companies
- [ ] Save favorite projects
- [ ] Share AR views
- [ ] Project details with specs/materials
- [ ] Integration with company websites/portfolios

### Phase 3 (Advanced)
- [ ] Multi-marker tracking (scan multiple logos)
- [ ] Indoor navigation for construction sites
- [ ] Progress tracking visualization
- [ ] BIM model integration
- [ ] Real-time construction updates

## Resources

### 3D Model Sources
- [Khronos glTF Samples](https://github.com/KhronosGroup/glTF-Sample-Models)
- [Sketchfab](https://sketchfab.com) - Has architectural models
- [TurboSquid](https://www.turbosquid.com) - Commercial models
- [Free3D](https://free3d.com) - Free models

### AI Model Generation
- [Tripo AI](https://tripo3d.ai)
- [Meshy AI](https://meshy.ai)
- [CSM AI](https://csm.ai)

### AR Development
- [Model Viewer Docs](https://modelviewer.dev)
- [ARCore Documentation](https://developers.google.com/ar)
- [ARKit Documentation](https://developer.apple.com/augmented-reality/)

## Support

For issues or questions:
1. Check console logs for errors
2. Verify all dependencies are installed
3. Ensure API keys are configured
4. Test on physical device (AR doesn't work on simulators)

## License
This project is configured for commercial/educational use. Ensure 3D models you use have appropriate licenses.

---

**Last Updated**: February 2026
**Version**: 2.0 (Construction Company Scanner)
