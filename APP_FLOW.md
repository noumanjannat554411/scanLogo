# App Flow Diagram

## 🎬 Continuous Logo Scanning Flow

```
                    ┌─────────────────┐
                    │   APP STARTS    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Check Camera    │
                    │   Permission    │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
         ┌──────▼──────┐          ┌──────▼──────┐
         │  Permission │          │  Permission │
         │   Granted   │          │   Denied    │
         └──────┬──────┘          └──────┬──────┘
                │                        │
                │                ┌───────▼──────┐
                │                │Show Request  │
                │                │   Button     │
                │                └──────────────┘
                │
        ┌───────▼────────┐
        │ CAMERA ACTIVE  │
        │ Showing Green  │
        │  Start Button  │
        └───────┬────────┘
                │
        ┌───────▼────────┐
        │  USER TAPS     │
        │ START SCANNING │
        └───────┬────────┘
                │
        ┌───────▼────────────────────────────────┐
        │   CONTINUOUS SCANNING MODE ACTIVE      │
        │   (Button turns RED = Stop Scanning)   │
        └───────┬────────────────────────────────┘
                │
                │  ┌─────────────────┐
                │  │  Every 2 secs:  │
                └──┤  Auto-capture   │◄─────┐
                   │  + Analyze      │      │
                   └────────┬────────┘      │
                            │               │
                   ┌────────▼────────┐      │
                   │ Take Photo      │      │
                   │ (no shutter)    │      │
                   └────────┬────────┘      │
                            │               │
                   ┌────────▼────────┐      │
                   │ Convert to      │      │
                   │ Base64          │      │
                   └────────┬────────┘      │
                            │               │
                   ┌────────▼────────┐      │
                   │ Delete temp     │      │
                   │ photo file      │      │
                   └────────┬────────┘      │
                            │               │
                   ┌────────▼────────┐      │
                   │ Send to Google  │      │
                   │ Vision API      │      │
                   └────────┬────────┘      │
                            │               │
                ┌───────────┴───────────┐   │
                │                       │   │
        ┌───────▼───────┐      ┌────────▼──────┐
        │  Logos Found  │      │  No Logos     │
        │  (Show in UI) │      │  (Show msg)   │
        └───────┬───────┘      └────────┬──────┘
                │                       │
                └───────────┬───────────┘
                            │
                            │  Wait 2 seconds
                            │  then repeat ────┘
                            │
                   ┌────────▼────────┐
                   │  USER TAPS      │
                   │  STOP SCANNING  │
                   └────────┬────────┘
                            │
                   ┌────────▼────────┐
                   │ Stop Interval   │
                   │ Show Start Btn  │
                   │   (GREEN)       │
                   └─────────────────┘
```

## 🎨 UI State Diagram

```
┌─────────────────────────────────────────────────────┐
│                    IDLE STATE                       │
│  ┌───────────────────────────────────────────┐     │
│  │         Camera Preview Active             │     │
│  │                                           │     │
│  │  Status: "Point camera at a logo"        │     │
│  └───────────────────────────────────────────┘     │
│  ┌───────────────────────────────────────────┐     │
│  │     [▶ Start Scanning]  (GREEN)          │     │
│  └───────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
                         │
                         │ User taps
                         ▼
┌─────────────────────────────────────────────────────┐
│                 SCANNING STATE                      │
│  ┌───────────────────────────────────────────┐     │
│  │  ╔══════════════════════════════════╗    │     │
│  │  ║    Camera with Green Frame       ║    │     │
│  │  ║                                  ║    │     │
│  │  ║    Status: "Analyzing..." 🔄     ║    │     │
│  │  ║    [Scanning line animation]     ║    │     │
│  │  ╚══════════════════════════════════╝    │     │
│  └───────────────────────────────────────────┘     │
│  ┌───────────────────────────────────────────┐     │
│  │     [⏸ Stop Scanning]  (RED)              │     │
│  └───────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
                         │
                         │ Logo detected
                         ▼
┌─────────────────────────────────────────────────────┐
│              RESULTS DISPLAYED                      │
│  ┌───────────────────────────────────────────┐     │
│  │  Camera Preview (still scanning)          │     │
│  │  Status: "Found 1 logo(s)!" ✓            │     │
│  └───────────────────────────────────────────┘     │
│  ┌───────────────────────────────────────────┐     │
│  │     [⏸ Stop Scanning]  (RED)              │     │
│  └───────────────────────────────────────────┘     │
│  ┌───────────────────────────────────────────┐     │
│  │  ✓ Detected Logos:                        │     │
│  │  ┌────────────────────────────────────┐   │     │
│  │  │ Nike               98.5% confident │   │     │
│  │  └────────────────────────────────────┘   │     │
│  └───────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
                         │
                         │ User taps stop
                         ▼
               Back to IDLE STATE
```

## 🔄 Scan Cycle Timeline

```
Time:     0s        2s        4s        6s        8s
          │         │         │         │         │
Action:   ├─Scan───┼─Scan───┼─Scan───┼─Scan───┼─...
          │         │         │         │         │
Steps:    │         │         │         │         │
          ├─Take photo                            
          ├─Convert to base64                     
          ├─Delete temp file                      
          ├─API call                              
          ├─Process result                        
          ├─Update UI                             
          └─Wait... ┴─────────┴─────────┴─────────┴─...
                    │         │         │         │
                    ├─Repeat──┼─Repeat──┼─Repeat──┼─...

Throttle: Min 1.5s between scans to prevent API spam
```

## 📱 Component Hierarchy

```
App
└── LogoScanner
    ├── Camera (background)
    │   ├── Scanning Indicator Overlay
    │   │   ├── Scan Frame (green border)
    │   │   └── Scan Line (animated)
    │   └── Status Bar
    │       ├── Status Text
    │       └── Loading Spinner
    ├── Controls
    │   └── Start/Stop Button
    │       ├── Green (when stopped)
    │       └── Red (when scanning)
    └── Results Container (conditional)
        └── Scroll View
            └── Logo Items
                ├── Logo Name
                └── Confidence %
```

## 🎯 User Journey

```
1. Open App
   └─► See camera preview with green "Start Scanning" button

2. Tap "Start Scanning"
   └─► Button turns RED
   └─► Status shows "Scanning for logos..."
   └─► Green frame appears on screen

3. Point at Logo (e.g., Nike swoosh)
   └─► App auto-scans every 2 seconds
   └─► Status briefly shows "Analyzing..."
   └─► (User keeps phone steady for 2-3 seconds)

4. Logo Detected!
   └─► Status shows "Found 1 logo(s)!"
   └─► Results panel slides up from bottom
   └─► Shows: "Nike - 98.5% confident"
   └─► App continues scanning in background

5. Point at Another Logo
   └─► Results update automatically
   └─► Multiple logos can be shown

6. Done Scanning
   └─► Tap red "Stop Scanning" button
   └─► Button turns GREEN again
   └─► Status shows "Scanning stopped"
   └─► Ready to start again
```

## 🛠️ State Management

```javascript
// Key State Variables:

isScanning: boolean
  └─► Currently sending API request?

isScanningActive: boolean
  └─► Is interval running? (Start/Stop toggle)

detectedLogos: Logo[]
  └─► Array of found logos with confidence

scanStatus: string
  └─► User-facing status message

scanIntervalRef: number
  └─► Reference to setInterval for cleanup

lastScanTimeRef: number
  └─► Throttle: prevent too frequent scans
```

This visual guide shows exactly how the continuous scanning feature works! 🎉
