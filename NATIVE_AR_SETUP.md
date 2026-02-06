# Native AR Quick Look Module - Setup Instructions

## What Was Created

I've created a **native iOS module** using Swift and QLPreviewController to open AR Quick Look directly without the Share popup.

### Files Created:

1. **`ios/ScanLogo/ARQuickLookModule.swift`** - Swift implementation using QLPreviewController
2. **`ios/ScanLogo/ARQuickLookModule.m`** - Objective-C bridge for React Native
3. **`src/utils/ARQuickLook.ts`** - TypeScript wrapper for the native module

## Setup Steps

### 1. Add Files to Xcode Project

You need to add the new Swift files to your Xcode project:

1. Open `ios/ScanLogo.xcworkspace` in Xcode
2. Right-click on the `ScanLogo` folder in the project navigator
3. Select **"Add Files to ScanLogo..."**
4. Navigate to `ios/ScanLogo/` and select:
   - `ARQuickLookModule.swift`
   - `ARQuickLookModule.m`
5. **Important**: Make sure "Copy items if needed" is **unchecked** (they're already in the right place)
6. Click **"Add"**

### 2. Create Bridging Header (if prompted)

When you add the Swift file, Xcode may ask:

> "Would you like to configure an Objective-C bridging header?"

- Click **"Create Bridging Header"**
- This creates `ScanLogo-Bridging-Header.h`

If Xcode doesn't prompt you:
1. Go to **File → New → File**
2. Choose **Header File**
3. Name it `ScanLogo-Bridging-Header.h`
4. Save it in `ios/ScanLogo/`

The bridging header content should be:
```objc
//
//  Use this file to import your target's public headers that you would like to expose to Swift.
//
#import <React/RCTBridgeModule.h>
```

### 3. Configure Build Settings

In Xcode:
1. Select your project in the navigator
2. Select the `ScanLogo` target
3. Go to **Build Settings** tab
4. Search for "bridging"
5. Set **Objective-C Bridging Header** to: `ScanLogo/ScanLogo-Bridging-Header.h`

### 4. Clean and Rebuild

```bash
cd ios
pod install
cd ..

# Clean build
npx react-native clean

# Rebuild for iOS
npx react-native run-ios
```

## How It Works

### Instead of Share API:
```typescript
// Old approach - shows share popup
await Share.share({ url: 'file://path.glb' });
```

### Now uses Native Module:
```typescript
// New approach - opens AR Quick Look directly
await ARQuickLook.openInAR('file://path.glb');
```

## What Happens

1. User clicks "View in AR"
2. App copies/downloads GLB file
3. **Native module is called** with file path
4. **QLPreviewController opens AR Quick Look directly** 🎉
5. No share popup, no file selection
6. Instant AR camera view!

## Troubleshooting

### If you get "ARQuickLookModule is not available":
- Make sure the files are added to the Xcode project
- Check that the bridging header is configured
- Clean and rebuild the project

### If Swift files don't compile:
- Check that the bridging header path is correct in Build Settings
- Make sure `#import <React/RCTBridgeModule.h>` is in the bridging header

### If AR Quick Look doesn't open:
- Check console logs for errors
- Verify the file path is correct (`file://...`)
- Ensure the device supports ARKit

## Testing

After rebuilding:
1. Scan a Nike logo
2. Select a product
3. Click "View in 3D"
4. Click "View in AR"
5. **AR Quick Look should open directly** - no popups! ✅

## Benefits

✅ **No Share Popup**: Opens AR Quick Look directly
✅ **Native Experience**: Uses Apple's QLPreviewController
✅ **Faster**: One less step for users
✅ **Professional**: Seamless AR transition
✅ **Reliable**: Uses official iOS APIs
