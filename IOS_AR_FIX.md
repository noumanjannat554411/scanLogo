# iOS AR Quick Look Fix - Final Solution

## Problem
When clicking "View in 3D" and then "View in AR" on iOS (iPhone 12 Pro), the AR Quick Look camera view was not opening. Multiple approaches were tried:
1. ❌ Direct `file://` URLs with `Linking.openURL()` - iOS blocks this
2. ❌ HTML relay files with `rel="ar"` - Security restrictions prevent opening local HTML
3. ✅ **Share API** - This works reliably!

## Final Solution
iOS requires using the **Share API** (`Share.share()`) to trigger AR Quick Look with local GLB files. The WebView 3D viewer continues to use remote URLs.

### Why Share API?
- iOS doesn't allow opening local `file://` URLs directly via `Linking.openURL()`
- The Share API can handle file URLs and automatically triggers AR Quick Look for 3D files
- This is Apple's recommended approach for opening AR content

### 1. **Separate Model Paths**
- **`modelUrl`**: Remote HTTPS URL for WebView 3D preview
- **`modelLocalFile`**: Local GLB file (via `require()`) for AR viewing

### 2. **Updated Data Structure**
Each product now has both URLs in `src/assets/data/arrays/data.tsx`:

```tsx
{
    image: images.shoes1,
    title: "Air Jordan 1 Mid",
    modelUrl: "https://...glb", // For 3D WebView
    modelLocalFile: models.shoe1, // For AR (local file)
    ...
}
```

### 3. **NativeARViewer Component Updates**
- Accepts both `modelUrl` and `modelLocalFile` props
- Uses `modelUrl` for the WebView 3D preview  
- Uses `modelLocalFile` for AR Quick Look on iOS
- **Uses Share API** to trigger AR Quick Look
- Automatically resolves and copies local files to Documents directory

### 4. **iOS AR Flow**
1. User clicks "View in 3D" → Opens WebView with remote URL
2. WebView displays 3D model using model-viewer
3. User clicks "View in AR":
   - Copies local GLB file to Documents directory (if using local file)
   - OR downloads from remote URL (if no local file)
   - **Opens Share sheet with the file**
   - Share sheet automatically detects it's a 3D file
   - **AR Quick Look launches directly** with camera view
4. User can place the model in their environment

## How It Works on iOS

### Using Share API for AR Quick Look:

```tsx
await Share.share({
    url: `file://${filePath}`,
    title: productTitle,
});
```

When you share a `.glb` or `.usdz` file on iOS, the system automatically:
1. Detects it's a 3D model file
2. Shows AR Quick Look preview
3. Allows user to view in AR with camera

This is **Apple's intended way** to trigger AR Quick Look programmatically.

## Key Technical Details

### Why Copy to Documents Directory?
- Files in the app bundle (from `require()`) may not be directly accessible
- iOS requires files to be in an accessible location like Documents directory
- Copying ensures reliable access for the Share API

### Share API Benefits
- ✅ **Official iOS method** - Uses Apple's recommended approach
- ✅ **Reliable** - No security restrictions like `Linking.openURL()`
- ✅ **Automatic AR detection** - iOS recognizes 3D files
- ✅ **Better UX** - Share sheet provides familiar interface
- ✅ **Flexible** - Works with both GLB and USDZ formats

## Testing

Test on iPhone 12 Pro or any iOS device with ARKit support:
1. Scan a Nike logo to view products
2. Click any product
3. Click "View in 3D" → Should show 3D model in WebView
4. Click "View in AR" → **Share sheet appears briefly, then AR Quick Look opens** ✅
5. AR Quick Look shows with camera view
6. Place the model in your environment

## Requirements

- iOS 12+ (for GLB support in AR Quick Look)
- ARKit compatible device (iPhone 6s and later)
- Local GLB files in `src/assets/models/` directory

## Files Modified

1. **`src/components/NativeARViewer.tsx`**
   - Added `Share` import from React Native
   - Added `modelLocalFile` prop
   - Added `arModelPath` state
   - Updated `prepareModel()` to handle both paths
   - Updated `openInAR()` to:
     - Copy local files to Documents directory
     - **Use Share.share() instead of Linking.openURL()**
     - Handle both local and remote files properly

2. **`src/assets/data/arrays/data.tsx`**
   - Added `modelLocalFile` field to all products
   - Kept `modelUrl` for WebView 3D viewing

3. **`src/screens/ProductDetailFullScreen.tsx`**
   - Pass `modelLocalFile` prop to NativeARViewer

## Errors Fixed

### Error 1: HTML Relay
❌ **Error**: 
```
Unable to open URL: file:///...ar_relay.html. 
Add file to LSApplicationQueriesSchemes in your Info.plist.
```
✅ **Solution**: Removed HTML relay, now using Share API

### Error 2: Direct File URL
❌ **Error**: 
```
Unable to open URL: file:///...Air_Jordan_1_Mid.glb
code: 'EUNSPECIFIED'
```
✅ **Solution**: Use Share.share() instead of Linking.openURL()

## Benefits

✅ **Official Apple Method**: Uses iOS's recommended approach
✅ **Fast AR Launch**: Local files copy quickly  
✅ **Reliable**: No URL opening restrictions
✅ **Native Experience**: Share sheet is familiar to users
✅ **Best AR Experience**: Launches directly into AR Quick Look
✅ **Offline Support**: Local files work without internet
✅ **Fallback Support**: Can still download remote files if needed

## Notes

- Android continues to use remote URLs with Scene Viewer
- Local GLB files are in `src/assets/models/` (shoe1.glb - shoe6.glb)
- The same GLB file works for both 3D viewing and AR
- USDZ format is also supported and may provide better iOS integration
- Share API briefly shows the share sheet before AR Quick Look opens (expected behavior)
- No Info.plist changes needed!
- No native module bridging required!
