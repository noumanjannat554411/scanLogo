#!/bin/bash

# Script to convert AVIF images to PNG format
# Make sure you have ImageMagick or similar tool installed

echo "Converting AVIF images to PNG..."

cd "$(dirname "$0")/../src/assets/images"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null
then
    echo "ImageMagick not found. Installing via Homebrew..."
    echo "Run: brew install imagemagick"
    echo ""
    echo "Alternative: Use online converter or image editing software"
    echo "Recommended: https://avif.io/ or https://squoosh.app/"
    exit 1
fi

# Convert each AVIF to PNG
for file in *.avif; do
    if [ -f "$file" ]; then
        filename="${file%.avif}"
        echo "Converting $file to ${filename}.png..."
        convert "$file" "${filename}.png"
    fi
done

echo "Conversion complete!"
echo "Now update images.tsx to use .png extension"
