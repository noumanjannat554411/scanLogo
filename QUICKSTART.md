# Quick Start Guide - ScanLogo App

## 🚀 Setup in 5 Minutes

### Step 1: Get Google Cloud Vision API Key

1. Visit: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable **Cloud Vision API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

### Step 2: Configure Your API Key

1. Open the `config.ts` file in the project root
2. Replace `YOUR_GOOGLE_CLOUD_VISION_API_KEY` with your actual API key:

```typescript
export const GOOGLE_CLOUD_VISION_API_KEY = 'AIzaSyC-xxxxxxxxxxxxxxxxxxxxx';
```

### Step 3: Run the App

#### For iOS:
```bash
npm run ios
```

#### For Android:
```bash
npm run android
```

### Step 4: Use the App - Continuous Scanning! 🎥

1. **Grant Permissions**: Allow camera access when prompted
2. **Tap "Start Scanning"**: Green button at bottom
3. **Point at Logos**: Move camera around - it scans automatically every 2 seconds!
4. **View Results**: Detected logos appear at the bottom in real-time
5. **Tap "Stop Scanning"**: Red button when you're done

**No need to take pictures!** Just point and scan continuously! 🎯

## 📱 Tested Logos

The app works great with popular logos like:
- Nike ✓
- Apple ✓
- Starbucks ✓
- McDonald's ✓
- Coca-Cola ✓
- Amazon ✓
- Google ✓
- Microsoft ✓
- And many more!

## ⚠️ Troubleshooting

### "Camera not ready"
- Restart the app
- Check permissions in device settings

### "API Error"
- Verify your API key in `config.ts`
- Check internet connection
- Ensure Cloud Vision API is enabled

### Build errors
```bash
# iOS
cd ios && pod install && cd ..
npm run ios

# Android
cd android && ./gradlew clean && cd ..
npm run android
```

## 💡 Tips

1. **Good Lighting**: Better light = better detection
2. **Clear View**: Make sure the logo is clearly visible
3. **Distance**: Not too close, not too far
4. **Steady Hand**: Hold phone steady when capturing

## 📊 API Usage

- **Free Tier**: 1,000 requests/month
- **Monitor Usage**: Check Google Cloud Console
- **Cost**: Very affordable for personal projects

## 🎯 Next Steps

Once you have it working:
1. Try different logos
2. Experiment with text detection
3. Add more features (check SETUP_GUIDE.md)

Need help? Check the full SETUP_GUIDE.md or create an issue!
