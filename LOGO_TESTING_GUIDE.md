# 🏗️ Logo Testing Guide - Construction Companies

## How to Get Test Logos

### Method 1: Display on Another Device (Recommended)

#### Bechtel Corporation
1. Search: "Bechtel logo high resolution"
2. Or visit: https://www.bechtel.com/
3. Display full-screen on tablet/laptop
4. Point your phone at the screen

**Logo Description:**
- Red square with white "Bechtel" text
- Clean, corporate design
- Usually on white background

---

#### Turner Construction
1. Search: "Turner Construction logo"
2. Or visit: https://www.turnerconstruction.com/
3. Display full-screen

**Logo Description:**
- Blue text "TURNER"
- Often with "Building the future" tagline
- Professional construction company look

---

#### Skanska
1. Search: "Skanska logo"
2. Or visit: https://www.skanska.com/
3. Display full-screen

**Logo Description:**
- Blue and green design
- "Skanska" text
- Modern, clean look

---

#### Fluor Corporation
1. Search: "Fluor Corporation logo"
2. Or visit: https://www.fluor.com/
3. Display full-screen

**Logo Description:**
- Stylized "F" or "Fluor" text
- Corporate blue/red colors
- Engineering company aesthetic

---

## Method 2: Print Logos

### Steps:
1. Search for each logo on Google Images
2. Download high-resolution version
3. Print on regular paper (color printer)
4. Point camera at printed logo

### Print Settings:
- Size: At least 4 inches wide
- Color: Yes
- Quality: Best/High
- Paper: Regular white paper is fine

---

## Method 3: Use Company Websites

Many company websites have their logo prominently displayed:

| Company | Website | Logo Location |
|---------|---------|---------------|
| Bechtel | https://www.bechtel.com/ | Top left header |
| Turner | https://www.turnerconstruction.com/ | Top header |
| Skanska | https://www.skanska.com/ | Top left |
| Fluor | https://www.fluor.com/ | Top navigation |

Simply open the website on another device and scan from your phone!

---

## Testing Each Logo

### ✅ Bechtel Test
**Expected Result:**
```
Scanning → Detects "Bechtel" → 
Shows 6 projects:
1. Modern Office Complex ($250M)
2. Luxury Residential Tower ($180M)
3. Shopping Mall & Entertainment Hub ($320M)
4. Tech Campus Headquarters ($420M)
5. Sustainable Hospital Complex ($290M)
6. Mixed-Use Urban Development ($550M)
```

### ✅ Turner Test
**Expected Result:**
```
Scanning → Detects "Turner" → 
Shows 4 projects:
1. Convention Center Expansion ($185M)
2. University Science Building ($95M)
3. Sports & Recreation Complex ($140M)
4. Data Center Facility ($210M)
```

### ✅ Skanska Test
**Expected Result:**
```
Scanning → Detects "Skanska" → 
Shows 3 projects:
1. Bridge Infrastructure Project ($380M)
2. Transit Station Complex ($275M)
3. Green Energy Power Plant ($450M)
```

### ✅ Fluor Test
**Expected Result:**
```
Scanning → Detects "Fluor" → 
Shows 2 projects:
1. Industrial Manufacturing Plant ($340M)
2. Pharmaceutical Research Complex ($280M)
```

---

## Scanning Tips

### 🎯 Best Practices

1. **Lighting**
   - Use bright, even lighting
   - Avoid shadows on logo
   - Natural daylight works best
   - Avoid glare from screens

2. **Distance**
   - Keep 30-50 cm (12-20 inches) from logo
   - Logo should fill about 50% of frame
   - Not too close, not too far

3. **Stability**
   - Hold phone steady
   - Keep logo in center of frame
   - Wait 2-3 seconds for detection
   - Watch for scanning animation

4. **Logo Quality**
   - Use high-resolution images
   - Ensure logo is clear and unobstructed
   - Avoid blurry or pixelated logos
   - Better quality = faster detection

### ❌ Common Mistakes

- ❌ Logo too small in frame
- ❌ Poor lighting (too dark/bright)
- ❌ Moving camera too much
- ❌ Low-resolution logo image
- ❌ Glare on screen/paper

---

## Troubleshooting Logo Detection

### Issue: "No logo detected after 4 attempts"

**Try:**
1. Improve lighting conditions
2. Move closer/farther from logo
3. Ensure logo is centered
4. Use higher quality logo image
5. Try different background (avoid busy backgrounds)

### Issue: "Found: [Company Name] (Not a construction company)"

**This means:**
- Logo was detected successfully
- But it's not one of our 4 supported companies
- This is expected behavior

**To fix:**
- Use logos from: Bechtel, Turner, Skanska, or Fluor only
- Or add new company to detection logic (see docs)

### Issue: Detects wrong company

**Try:**
1. Use official company logo (not modified versions)
2. Ensure entire logo is visible
3. Avoid logos with heavy branding/text around them
4. Check console logs for detected description

---

## Quick Reference Card

```
┌─────────────────────────────────────┐
│     LOGO DETECTION CHECKLIST        │
├─────────────────────────────────────┤
│ □ Good lighting (no shadows)        │
│ □ Logo 30-50cm from camera          │
│ □ Logo centered in frame            │
│ □ High-resolution logo              │
│ □ Hold steady for 2-3 seconds       │
│ □ Use one of 4 supported companies  │
│                                     │
│ Supported Companies:                │
│  • Bechtel                          │
│  • Turner Construction              │
│  • Skanska                          │
│  • Fluor Corporation                │
└─────────────────────────────────────┘
```

---

## Alternative: Use Google Images

If you can't access company websites, search these exact terms:

1. `Bechtel corporation logo transparent`
2. `Turner construction company logo png`
3. `Skanska logo official`
4. `Fluor corporation logo vector`

Then display or print the highest quality result.

---

## Testing Sequence Recommendation

**Day 1: Basic Testing**
1. Test Bechtel logo detection
2. Browse through projects
3. Open one project detail
4. View 3D model

**Day 2: Full Flow**
1. Test all 4 company logos
2. Navigate through all projects
3. Test 3D viewer for each company
4. Verify data accuracy

**Day 3: AR Testing**
1. Test AR placement for different models
2. Test on different surfaces (floor, table)
3. Test scaling and rotation
4. Verify in-app AR (no external navigation)

---

## Logo Detection Console Messages

Watch for these in the logs:

```
🏗️ Checking logo: bechtel
✅ Detected construction company: Bechtel
```

or

```
🏗️ Checking logo: nike
⚠️ Detected logo but not a recognized construction company
```

---

## Need More Help?

- See `CONSTRUCTION_SCANNER_GUIDE.md` for implementation details
- See `TESTING_CONSTRUCTION.md` for complete testing guide
- See `UPDATE_SUMMARY.md` for what was changed
- Check console logs with `🏗️` emoji for debug info

---

**Happy Testing! 🏗️📱**

Remember: The goal is to scan construction company logos and view their building projects in AR, all within the app!
