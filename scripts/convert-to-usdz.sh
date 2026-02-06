#!/bin/bash

# GLB to USDZ Conversion Script for iOS AR Quick Look
# This script converts GLB files to USDZ format using Apple's xcrun utility

echo "🔄 Converting GLB files to USDZ format..."
echo ""

# Directory containing the models
MODEL_DIR="src/assets/models"

# Check if xcrun is available (requires Xcode Command Line Tools)
if ! command -v xcrun &> /dev/null; then
    echo "❌ Error: xcrun not found. Please install Xcode Command Line Tools:"
    echo "   xcode-select --install"
    exit 1
fi

# Convert each GLB file
for glb_file in "$MODEL_DIR"/*.glb; do
    if [ -f "$glb_file" ]; then
        # Get filename without extension
        filename=$(basename "$glb_file" .glb)
        usdz_file="$MODEL_DIR/${filename}.usdz"
        
        echo "📦 Converting: $filename.glb → $filename.usdz"
        
        # Use xcrun to convert GLB to USDZ
        xcrun usdz_converter "$glb_file" "$usdz_file" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo "   ✅ Success: $filename.usdz created"
            # Get file sizes
            glb_size=$(du -h "$glb_file" | cut -f1)
            usdz_size=$(du -h "$usdz_file" | cut -f1)
            echo "   📊 GLB: $glb_size → USDZ: $usdz_size"
        else
            echo "   ❌ Failed to convert $filename.glb"
        fi
        echo ""
    fi
done

echo "🎉 Conversion complete!"
echo ""
echo "Next steps:"
echo "1. Update models.ts to export USDZ files"
echo "2. Test AR Quick Look with USDZ files"
