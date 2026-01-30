# Hosting GLB Files for AR

## The Problem
Google Scene Viewer (ARCore) on Android requires GLB files to be hosted on **publicly accessible HTTPS URLs**. Local Metro bundler URLs (`http://localhost:8081`) won't work.

## Solutions

### Option 1: Firebase Storage (Recommended)
1. **Create Firebase Project**: https://console.firebase.google.com/
2. **Go to Storage** in Firebase Console
3. **Upload your GLB files** (`shoe1.glb`, `shoe2.glb`, etc.)
4. **Get public URLs**:
   - Click on each file
   - Copy the download URL
   - Format: `https://firebasestorage.googleapis.com/v0/b/your-project.appspot.com/o/shoe1.glb?alt=media&token=...`
5. **Update data.tsx**:
   ```typescript
   modelUrl: "https://firebasestorage.googleapis.com/v0/b/your-project.appspot.com/o/shoe1.glb?alt=media&token=abc123"
   ```

### Option 2: AWS S3
1. Create S3 bucket
2. Upload GLB files
3. Make files publicly readable
4. Copy object URLs
5. Update data.tsx with HTTPS URLs

### Option 3: Cloudinary
1. Sign up at https://cloudinary.com (free tier available)
2. Upload GLB files
3. Get public URLs
4. Update data.tsx

### Option 4: GitHub Pages (Free)
1. Create a new GitHub repo
2. Add your GLB files
3. Enable GitHub Pages
4. Access files at: `https://username.github.io/repo-name/shoe1.glb`

### Option 5: Temporary File Hosting (For Testing)
1. **tmpfiles.org**: Upload GLB, get temporary URL (deleted after 1 hour)
2. **file.io**: One-time download URLs
3. **Transfer.sh**: Command line uploads

## Example: Using Firebase Storage

### Step 1: Install Firebase
```bash
npm install @react-native-firebase/app @react-native-firebase/storage
```

### Step 2: Upload Files
You can upload manually or programmatically:

```typescript
import storage from '@react-native-firebase/storage';

const uploadGLB = async (localPath: string, fileName: string) => {
  const reference = storage().ref(`models/${fileName}`);
  await reference.putFile(localPath);
  const url = await reference.getDownloadURL();
  return url;
};
```

### Step 3: Update Your Data
```typescript
// In data.tsx
export const product = {
    nike: [
        {
            // ... other fields
            modelUrl: "https://firebasestorage.googleapis.com/.../shoe1.glb"
        }
    ]
}
```

## Quick Test with Public Models

While setting up hosting, you can test with these public GLB models:

```typescript
// Sneaker models from Sketchfab (if available)
modelUrl: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"

// Or search Sketchfab for "sneaker glb" and use download URLs
```

## Current Setup

Your GLB files are currently in:
- `/src/assets/models/shoe1.glb` through `shoe6.glb`

These need to be uploaded to a hosting service for AR to work on Android devices.

## Testing AR

1. Upload GLB files to Firebase/AWS/etc.
2. Update `modelUrl` in `data.tsx` with HTTPS URLs
3. Build and test on Android device
4. Click "View in 3D" → "View in AR"
5. Google Scene Viewer will launch with your shoe model

## For iOS

iOS AR Quick Look works with both local and remote files, so you can test locally on iOS simulators/devices.
