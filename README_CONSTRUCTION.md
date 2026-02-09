# 🏗️ Construction AR Scanner

A React Native mobile application that scans construction company logos and displays their building projects in 3D with in-app Augmented Reality viewing.

## 🎯 Overview

Point your camera at a construction company logo, and the app will:
1. **Detect** the logo using Google Cloud Vision API
2. **Display** the company's building projects
3. **Show** 3D models of buildings/structures
4. **Enable** AR viewing directly in the app

## 🏢 Supported Companies

- **Bechtel Corporation** - Commercial & Residential Projects
- **Turner Construction** - Public & Educational Facilities  
- **Skanska** - Infrastructure & Energy Projects
- **Fluor Corporation** - Industrial & Research Facilities

## ✨ Key Features

### 📱 Logo Detection
- Real-time logo scanning using device camera
- AI-powered detection via Google Cloud Vision API
- Supports multiple construction company logos
- Continuous scanning with visual feedback

### 🏗️ Project Showcase
- Beautiful carousel of building projects
- Detailed project information (budget, type, description)
- High-quality project imagery
- Smooth navigation between projects

### 🎨 3D Model Viewing
- Interactive 3D models using Google Model Viewer
- Rotate, zoom, and pan gestures
- Auto-rotation with customizable controls
- Optimized rendering for mobile devices

### 🥽 In-App AR Experience
- **No external app navigation** - AR works within the app
- Place 3D buildings in your real environment
- Scale and position models naturally
- Works on both iOS (AR Quick Look) and Android (Scene Viewer)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- React Native development environment
- Android Studio or Xcode
- Google Cloud Vision API key

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd BuildingAR

# Install dependencies
npm install

# iOS specific
cd ios && pod install && cd ..

# Copy config template
cp config.example.ts config.ts

# Add your Google Cloud Vision API key to config.ts
```

### Configuration

1. **Get Google Cloud Vision API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Cloud Vision API
   - Create credentials (API Key)
   - Copy the key

2. **Update config.ts**
   ```typescript
   export const GOOGLE_CLOUD_VISION_API_KEY = 'your-api-key-here';
   ```

### Running the App

```bash
# Android
npm run android

# iOS  
npm run ios
```

## 📖 How to Use

1. **Open the App** → Tap "Start Scanning"
2. **Scan Logo** → Point camera at a construction company logo
3. **Browse Projects** → Swipe through building projects carousel
4. **View Details** → Tap a project to see full details
5. **3D Model** → Tap "View in 3D" button
6. **AR Experience** → Tap "View in AR" to place in your space

## 🎨 Screenshots

```
[Scanner Screen] → [Projects Carousel] → [3D Viewer] → [AR View]
```

## 🏗️ Architecture

```
src/
├── components/
│   ├── LogoScannerEnhanced.tsx    # Main scanner component
│   ├── ARModelViewer.tsx          # 3D model & AR viewer
│   └── ...
├── screens/
│   ├── ProductDetailsScreen.tsx   # Projects carousel
│   ├── ProductDetailFullScreen.tsx # Full project details
│   └── ...
├── services/
│   └── visionApi.ts               # Google Vision API integration
├── assets/
│   └── data/
│       └── arrays/
│           ├── construction-data.tsx  # Company projects data
│           └── data.tsx               # Legacy data
└── ...
```

## 🔧 Tech Stack

- **React Native** - Mobile framework
- **TypeScript** - Type safety
- **Google Cloud Vision API** - Logo detection
- **Google Model Viewer** - 3D rendering
- **React Native WebView** - AR viewer container
- **React Navigation** - Navigation
- **React Native Camera** - Camera access

## 🎯 Adding New Companies

### 1. Add Company Data

Edit `src/assets/data/arrays/construction-data.tsx`:

```typescript
yourcompany: [
    {
        id: 1,
        image: images.project1,
        title: "Amazing Building",
        price: "$200M",
        type: "Commercial",
        url: "https://company.com/",
        modelUrl: "https://your-cdn.com/building.glb",
        modelLocalFile: models.default,
        description: "Project details..."
    }
]
```

### 2. Update Detection Logic

Edit `src/components/LogoScannerEnhanced.tsx` (around line 230):

```typescript
else if (desc.includes('yourcompany')) {
    detectedCompany = 'Your Company Name';
    companyProjects = constructionCompanies.yourcompany;
    break;
}
```

### 3. Add 3D Models

Option 1: **Use Public Models**
```typescript
modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/YourModel.glb"
```

Option 2: **Generate with AI**
- Use [Tripo AI](https://tripo3d.ai)
- Use [Meshy AI](https://meshy.ai)  
- Use [CSM AI](https://csm.ai)

Option 3: **Create Custom Models**
- Blender, SketchUp, Revit, etc.
- Export as GLB format
- Host on CDN with CORS enabled

## 🧪 Testing

### Test Logo Detection

```bash
# Run the test helper
chmod +x scripts/test-construction-scanner.sh
./scripts/test-construction-scanner.sh
```

### Test with Real Logos

1. Search for company logos online (Bechtel, Turner, Skanska, Fluor)
2. Display on another device or print them
3. Open scanner and point at logo
4. Verify detection and navigation

### Test AR Functionality

1. Select any project
2. Tap "View in 3D"
3. Wait for model to load (check console for errors)
4. Tap "View in AR"
5. Point at floor/table surface
6. Place and interact with model

## 📱 Device Requirements

### iOS
- iOS 12.0 or higher
- ARKit support (iPhone 6S and newer)
- Camera permission

### Android  
- Android 7.0 (API 24) or higher
- ARCore support
- Camera permission

## 🐛 Troubleshooting

### Logo Not Detected
- Check API key in `config.ts`
- Ensure good lighting
- Move closer to logo
- Check console for API errors

### 3D Model Won't Load
- Verify `modelUrl` is accessible
- Check CORS settings
- Ensure GLB file is valid
- Check WebView console

### AR Not Working
- Test on physical device (not simulator)
- Verify AR support (ARCore/ARKit)
- Check camera permissions
- Point at textured flat surface

## 📚 Documentation

- [Construction Scanner Guide](./CONSTRUCTION_SCANNER_GUIDE.md) - Detailed implementation guide
- [Setup Guide](./SETUP_GUIDE.md) - Development setup
- [Testing Checklist](./TESTING_CHECKLIST.md) - QA checklist

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Credits

- Google Cloud Vision API for logo detection
- Google Model Viewer for 3D rendering
- Khronos Group for glTF sample models
- React Native community

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Check documentation in `CONSTRUCTION_SCANNER_GUIDE.md`
- Review console logs for errors

## 🗺️ Roadmap

### Phase 1 ✅ (Current)
- Construction company logo detection
- In-app AR viewing
- Multiple companies support
- Project carousels

### Phase 2 🚧 (Next)
- [ ] Realistic building 3D models
- [ ] More construction companies
- [ ] Favorite projects
- [ ] Share AR screenshots
- [ ] Project specifications

### Phase 3 🔮 (Future)
- [ ] Multi-marker tracking
- [ ] Construction site navigation
- [ ] Progress visualization
- [ ] BIM integration
- [ ] Real-time updates

---

**Built with ❤️ for the Construction Industry**

Last Updated: February 2026 | Version: 2.0
