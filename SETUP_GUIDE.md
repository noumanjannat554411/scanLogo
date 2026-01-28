# ScanLogo - Logo Detection with Google Vision API

A React Native application that uses Google Cloud Vision API to detect and identify logos in real-time using your device's camera.

## Features

- 📸 Real-time camera integration
- 🔍 Logo detection using Google Cloud Vision API
- 📊 Confidence scores for detected logos
- 🎯 Multiple logo detection in a single image
- 📱 Cross-platform (iOS & Android)

## Prerequisites

- Node.js >= 20
- React Native development environment set up
- Google Cloud Platform account with Vision API enabled
- iOS: Xcode and CocoaPods
- Android: Android Studio

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Google Cloud Vision API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Cloud Vision API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Cloud Vision API"
   - Click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key
5. (Recommended) Restrict your API key:
   - Click on your API key
   - Under "Application restrictions", select your platform
   - Under "API restrictions", select "Cloud Vision API"

### 3. Configure API Key

Edit the `config.ts` file and replace `YOUR_GOOGLE_CLOUD_VISION_API_KEY` with your actual API key:

```typescript
export const GOOGLE_CLOUD_VISION_API_KEY = 'your-actual-api-key-here';
```

**⚠️ Security Warning**: Never commit your API key to version control. Consider using:
- `react-native-config` for environment variables
- `.env` files (add to `.gitignore`)
- Secure key management services

### 4. iOS Setup

```bash
cd ios
pod install
cd ..
```

The Info.plist has been configured with necessary camera permissions.

### 5. Android Setup

The AndroidManifest.xml has been configured with camera and storage permissions.

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## How to Use

1. Launch the app
2. Grant camera permissions when prompted
3. Point your camera at a logo
4. Tap "Scan Logo" to capture and analyze the image
5. View detected logos with confidence scores
6. Tap "Take Another" to scan another logo

## Project Structure

```
ScanLogo/
├── src/
│   ├── components/
│   │   └── LogoScanner.tsx      # Main camera and scanning component
│   └── services/
│       └── visionApi.ts         # Google Vision API integration
├── config.ts                     # API configuration
├── App.tsx                       # App entry point
└── package.json
```

## API Features Used

### Logo Detection
The app uses the `LOGO_DETECTION` feature of Google Cloud Vision API, which can detect:
- Popular brand logos
- Company logos
- Product logos
- And more

### Optional: Text Detection
The `visionApi.ts` service also includes a `detectText()` function that can be used to detect text/brand names in images.

## Troubleshooting

### Camera not working
- Make sure you've granted camera permissions
- Check that the camera device is available
- Try restarting the app

### API errors
- Verify your API key is correct in `config.ts`
- Check that Cloud Vision API is enabled in your Google Cloud project
- Ensure you're not exceeding API quota limits

### Build issues
- For iOS: Try `cd ios && pod install && cd ..`
- For Android: Clean the build with `cd android && ./gradlew clean && cd ..`
- Clear Metro cache: `npm start -- --reset-cache`

## Dependencies

- `react-native-vision-camera` - Camera functionality
- `axios` - HTTP client for API calls
- `react-native-permissions` - Permission handling
- `react-native-fs` - File system operations

## API Pricing

Google Cloud Vision API offers:
- First 1,000 units/month: Free
- Additional units: Paid (check current pricing)

Monitor your usage in the Google Cloud Console.

## Future Enhancements

- [ ] Add web detection for product information
- [ ] Implement image labeling
- [ ] Add landmark detection
- [ ] Save scan history
- [ ] Batch processing of multiple images
- [ ] Share detected results

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
