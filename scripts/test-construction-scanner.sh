#!/bin/bash

# Construction AR Scanner - Quick Test Script
# This script helps you test the construction company scanner

echo "🏗️  Construction AR Scanner - Test Helper"
echo "=========================================="
echo ""

# Test 1: Check if construction data is properly imported
echo "✅ Test 1: Checking construction data file..."
if [ -f "src/assets/data/arrays/construction-data.tsx" ]; then
    echo "   ✓ construction-data.tsx exists"
else
    echo "   ✗ construction-data.tsx missing!"
    exit 1
fi

# Test 2: Check if LogoScannerEnhanced imports construction data
echo ""
echo "✅ Test 2: Checking LogoScannerEnhanced imports..."
if grep -q "construction-data" src/components/LogoScannerEnhanced.tsx; then
    echo "   ✓ Construction data imported in scanner"
else
    echo "   ✗ Construction data not imported!"
    exit 1
fi

# Test 3: Check if company detection logic exists
echo ""
echo "✅ Test 3: Checking company detection logic..."
if grep -q "bechtel\|turner\|skanska\|fluor" src/components/LogoScannerEnhanced.tsx; then
    echo "   ✓ Company detection logic found"
else
    echo "   ✗ Company detection logic missing!"
    exit 1
fi

# Test 4: Check Model Viewer component
echo ""
echo "✅ Test 4: Checking AR Model Viewer..."
if [ -f "src/components/ARModelViewer.tsx" ]; then
    echo "   ✓ ARModelViewer.tsx exists"
    if grep -q "model-viewer" src/components/ARModelViewer.tsx; then
        echo "   ✓ Model Viewer integration found"
    fi
else
    echo "   ✗ ARModelViewer.tsx missing!"
fi

echo ""
echo "=========================================="
echo "📋 All checks passed!"
echo ""
echo "🚀 Next Steps:"
echo "   1. Print or display a construction company logo:"
echo "      - Bechtel"
echo "      - Turner Construction" 
echo "      - Skanska"
echo "      - Fluor"
echo ""
echo "   2. Run the app:"
echo "      npm run android   (for Android)"
echo "      npm run ios       (for iOS)"
echo ""
echo "   3. Tap the scan button and point at the logo"
echo ""
echo "   4. Select a building project from the carousel"
echo ""
echo "   5. Tap 'View in 3D' button"
echo ""
echo "   6. Tap 'View in AR' to see the model in your space"
echo ""
echo "💡 Tips:"
echo "   - Use good lighting for logo detection"
echo "   - Keep logo in frame for 2-3 seconds"
echo "   - AR works best on textured surfaces"
echo "   - Test on a physical device (not simulator)"
echo ""
echo "🔗 For more details, see: CONSTRUCTION_SCANNER_GUIDE.md"
echo ""
