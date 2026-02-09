# 🐛 Debug Guide for 3D Models

## Changes Made

### 1. **Fixed URL Handling**
- Firebase URLs are now properly escaped for HTML
- Added support for special characters in URLs (`%2F`, `&`, `?`, etc.)

### 2. **Enhanced Error Logging**
The app now logs detailed information when loading models:

```
🔵 Model Viewer initialized with URL: [your Firebase URL]
📊 Loading progress: 25%
✅ Model loaded successfully
```

or if there's an error:
```
❌ Model loading error: [error details]
❌ Model URL not accessible: [error]
```

### 3. **Better Error Display**
- Shows user-friendly error messages in the 3D viewer
- Provides retry button if initial load fails

## How to Debug

### Step 1: Check Metro Bundler Logs
In the terminal where you ran `npm run android`, look for:
- `🔵 WebView started loading`
- `✅ WebView finished loading`
- `WebView Console: [messages from model-viewer]`

### Step 2: Check Android Logcat
Run this command in a new terminal:
```bash
cd /Users/wasaamqazi/Desktop/ar/BuildingAR
npx react-native log-android
```

Look for:
- `🔵 loadModel called with modelUrl:`
- `🌐 Using remote URL:`
- `✅ Model loaded successfully`

### Step 3: Test URLs Directly

Test if Firebase URLs are accessible:

**Steinway Tower:**
```bash
curl -I "https://firebasestorage.googleapis.com/v0/b/fix-it-dev.firebasestorage.app/o/modal%2F111w57_-_steinway_tower.glb?alt=media&token=ce45df13-9861-49a4-8006-1ae165e095d8"
```

Should return `HTTP/2 200` if working.

## Common Issues & Solutions

### ❌ Issue: "Error loading model"
**Possible Causes:**
1. Firebase Storage rules don't allow public access
2. Network connection issues
3. File is too large to load on mobile

**Solution:**
1. Check Firebase Storage Rules:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /modal/{allPaths=**} {
         allow read: if true;  // Allow public read
       }
     }
   }
   ```

2. Verify file size (should be < 50MB for mobile):
   ```bash
   curl -sI "YOUR_URL" | grep -i content-length
   ```

### ❌ Issue: "Model loads but is too small/large"
**Solution:** Adjust camera orbit in `ARModelViewer.tsx`:
```javascript
camera-orbit="0deg 75deg 5m"  // Change 5m to 2m or 10m
```

### ❌ Issue: "Model loads in 3D but AR doesn't work"
**Possible Causes:**
1. GLB file doesn't have proper scale/orientation
2. Model is too complex for AR
3. Device doesn't support AR

**Solution:**
- Simplify the model (reduce polygons)
- Use online GLB optimizer: https://glb.tools/optimize

## Testing Checklist

- [ ] App opens successfully
- [ ] Scanner detects construction company logo
- [ ] 3D viewer opens automatically
- [ ] Loading spinner shows
- [ ] 3D model appears (not error message)
- [ ] Model can be rotated with finger
- [ ] "View in AR" button is visible
- [ ] Tapping "View in AR" opens AR mode
- [ ] Model appears in AR camera view

## Next Steps if Still Having Issues

1. **Check Firebase Console:**
   - Go to Firebase Console
   - Navigate to Storage
   - Verify files exist in `modal/` folder
   - Check file permissions (should be public)

2. **Try a simple test model first:**
   Replace one URL with this known-working model:
   ```
   https://modelviewer.dev/shared-assets/models/Astronaut.glb
   ```

3. **Check model file format:**
   - Must be `.glb` (not `.gltf`)
   - Should have textures embedded
   - File size < 50MB recommended

## Viewing Real-Time Logs

### On Mac (recommended):
```bash
cd /Users/wasaamqazi/Desktop/ar/BuildingAR
npx react-native log-android | grep -E "🔵|✅|❌|WebView"
```

This will filter only relevant logs about model loading.

## Firebase Storage Rules (IMPORTANT!)

Make sure your Firebase Storage rules allow public read access:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;  // Public read access
      allow write: if false; // Prevent unauthorized writes
    }
  }
}
```

To update:
1. Go to Firebase Console → Storage → Rules
2. Paste the rules above
3. Click "Publish"

## Success Indicators

When everything works correctly, you'll see:
```
🔵 loadModel called with modelUrl: https://firebasestorage...
🌐 Using remote URL: https://firebasestorage...
✅ Model loaded successfully
🔵 WebView started loading
✅ WebView finished loading
WebView Console: ✅ Model loaded successfully
WebView Console: 📊 Loading progress: 100%
```

## Contact Points

If models still don't load, check:
1. Is your phone connected to internet? (test in browser)
2. Are Firebase URLs accessible from your phone's browser?
3. Can you open the URL directly in Chrome on your phone?

Try opening this URL in your phone's Chrome browser:
```
https://firebasestorage.googleapis.com/v0/b/fix-it-dev.firebasestorage.app/o/modal%2F111w57_-_steinway_tower.glb?alt=media&token=ce45df13-9861-49a4-8006-1ae165e095d8
```

If it downloads/shows the file, the URL is working!
