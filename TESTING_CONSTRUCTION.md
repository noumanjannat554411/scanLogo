# 🧪 Quick Testing Guide - Construction AR Scanner

## Testing the Updated Flow

### ✅ Step 1: Verify Installation

```bash
# Check construction data exists
ls src/assets/data/arrays/construction-data.tsx

# Run test script
chmod +x scripts/test-construction-scanner.sh
./scripts/test-construction-scanner.sh
```

### ✅ Step 2: Get Test Logos

You can use these companies' logos for testing:

#### Option 1: Search Online & Display on Screen
1. Google: "Bechtel logo"
2. Google: "Turner Construction logo"  
3. Google: "Skanska logo"
4. Google: "Fluor Corporation logo"
5. Display full-screen on another device/computer

#### Option 2: Print Logos
Download and print the logos from company websites:
- https://www.bechtel.com/
- https://www.turnerconstruction.com/
- https://www.skanska.com/
- https://www.fluor.com/

### ✅ Step 3: Run the App

```bash
# For Android
npm run android

# For iOS (Mac only)
npm run ios
```

### ✅ Step 4: Test Logo Detection

1. **Open Scanner**
   - Tap "Start Scanning" or scanner button
   - Grant camera permission if prompted

2. **Scan a Logo**
   - Point camera at Bechtel logo
   - Keep logo in frame for 2-3 seconds
   - Look for:
     - ✅ "Scanning for logos..." status
     - ✅ Visual scanning animation
     - ✅ "Found logo" success message

3. **Expected Result**
   - Should navigate to projects screen
   - Shows Bechtel building projects
   - Displays carousel with 6 projects

### ✅ Step 5: Test Each Company

| Company | Expected Projects |
|---------|------------------|
| Bechtel | 6 projects (Office, Residential, Mall, Tech Campus, Hospital, Mixed-Use) |
| Turner | 4 projects (Convention Center, University, Sports Complex, Data Center) |
| Skanska | 3 projects (Bridge, Transit Station, Power Plant) |
| Fluor | 2 projects (Manufacturing Plant, Pharma Complex) |

### ✅ Step 6: Test 3D Viewer

1. **Select a Project**
   - Swipe through carousel
   - Tap on any project card

2. **Open 3D Viewer**
   - Tap "View in 3D" button (orange gradient)
   - Wait for loading animation

3. **Expected Behavior**
   - ✅ Model loads in WebView
   - ✅ Can rotate model with touch
   - ✅ Can zoom with pinch
   - ✅ Auto-rotation is active
   - ✅ Control buttons visible (reset, pause)

### ✅ Step 7: Test In-App AR

1. **Open AR Mode**
   - In the 3D viewer, tap "📱 View in AR" button
   - **Important**: AR opens WITHIN the app (not external)

2. **iOS AR (AR Quick Look)**
   - Should show AR interface overlaid
   - Point at floor/table
   - Tap to place model
   - Pinch to scale, drag to move

3. **Android AR (Scene Viewer)**
   - Should show AR interface
   - Point at flat surface
   - Tap to place model
   - Use controls to adjust

4. **Expected Result**
   - ✅ AR opens in-app (no external navigation)
   - ✅ Can see camera feed with 3D model
   - ✅ Model scales appropriately
   - ✅ Can move and rotate model

## 📋 Testing Checklist

### Logo Detection
- [ ] Scanner UI shows "🏗️ Construction Scanner"
- [ ] Camera activates with scanning frame
- [ ] Detects Bechtel logo
- [ ] Detects Turner logo
- [ ] Detects Skanska logo
- [ ] Detects Fluor logo
- [ ] Shows appropriate error for non-construction logos
- [ ] Scanning animation works
- [ ] Progress indicator updates

### Navigation Flow
- [ ] Scanner → Projects screen works
- [ ] Projects screen shows correct company name
- [ ] Carousel displays all projects
- [ ] Can swipe through projects smoothly
- [ ] Tap project opens detail screen
- [ ] Back button returns to previous screen

### 3D Model Viewer
- [ ] "View in 3D" button is visible
- [ ] Loading indicator shows while loading
- [ ] Model renders in WebView
- [ ] Can rotate model with touch
- [ ] Can zoom with pinch
- [ ] Auto-rotation works
- [ ] Control buttons functional (reset, pause)
- [ ] Close button exits viewer

### AR Functionality
- [ ] "View in AR" button visible in 3D viewer
- [ ] AR opens within the app (not external)
- [ ] Camera feed shows with overlay
- [ ] Can detect floor/surface
- [ ] Can place 3D model
- [ ] Can scale model
- [ ] Can rotate/move model
- [ ] Exit AR returns to 3D viewer

### Performance
- [ ] Scanning is responsive (< 3 sec)
- [ ] Logo detection is accurate
- [ ] 3D models load in reasonable time (< 10 sec)
- [ ] AR placement is smooth (no lag)
- [ ] App doesn't crash
- [ ] Memory usage is acceptable

## 🐛 Common Issues & Solutions

### Issue: Logo Not Detected
**Solutions:**
- Check `config.ts` has valid Google Cloud Vision API key
- Ensure good lighting (no shadows on logo)
- Move camera 30-50cm from logo
- Check console: `adb logcat` (Android) or Xcode console (iOS)

### Issue: "Found: [Company] (Not a construction company)"
**Cause:** Logo detected but not in our list
**Solution:** Add company to detection logic in `LogoScannerEnhanced.tsx`

### Issue: 3D Model Won't Load
**Solutions:**
- Check network connection
- Verify `modelUrl` in `construction-data.tsx`
- Check WebView console for CORS errors
- Try different 3D model URL

### Issue: AR Button Doesn't Work
**Solutions:**
- Test on physical device (AR doesn't work on simulators)
- Check device has AR support (ARCore/ARKit)
- Grant camera permissions
- Verify WebView has AR capabilities enabled

### Issue: AR Opens External App
**This shouldn't happen! AR should open in-app.**
**If it does:**
- Check `ARModelViewer.tsx` uses WebView
- Verify Model Viewer configuration
- Check `ar-modes` attribute in HTML

## 🔍 Debugging

### Enable Console Logs

```typescript
// In LogoScannerEnhanced.tsx, check for:
console.log('🔍 scanCurrentFrame called');
console.log('🏗️ Checking logo:', desc);
console.log('✅ Detected construction company:', detectedCompany);
```

### Check API Response

```typescript
// In visionApi.ts
console.log('Vision API response:', response.data);
```

### WebView Debugging

**Android:**
```bash
# Enable WebView debugging
chrome://inspect/#devices
```

**iOS:**
- Safari → Develop → [Your Device] → [WebView]

## 📊 Test Results Template

```
Date: ___________
Device: ___________
OS Version: ___________

Logo Detection:
- Bechtel: ⬜ Pass ⬜ Fail
- Turner: ⬜ Pass ⬜ Fail  
- Skanska: ⬜ Pass ⬜ Fail
- Fluor: ⬜ Pass ⬜ Fail

3D Viewing: ⬜ Pass ⬜ Fail
AR In-App: ⬜ Pass ⬜ Fail

Issues Found:
_______________________________
_______________________________

Notes:
_______________________________
_______________________________
```

## 🎯 Success Criteria

✅ **All logos detected** within 3 seconds
✅ **Projects display** correctly for each company
✅ **3D models load** and render smoothly
✅ **AR opens in-app** without external navigation
✅ **No crashes** during normal usage
✅ **UI responsive** on mid-range devices

## 📱 Test Devices

Recommended test matrix:

| Platform | Device | OS Version | AR Support |
|----------|--------|------------|------------|
| iOS | iPhone 11+ | iOS 15+ | ARKit ✅ |
| Android | Pixel 5+ | Android 11+ | ARCore ✅ |
| Android | Samsung S20+ | Android 11+ | ARCore ✅ |

## 🚀 Next Steps After Testing

1. **If all tests pass:**
   - Replace placeholder 3D models with realistic buildings
   - Add more construction companies
   - Add real project images

2. **If issues found:**
   - Document in GitHub issues
   - Check console logs
   - Refer to troubleshooting guide

## 📞 Need Help?

- Check `CONSTRUCTION_SCANNER_GUIDE.md` for detailed docs
- Review console logs for errors
- Test on different device if issues persist
- Verify all dependencies are installed correctly

---

**Happy Testing! 🏗️**
