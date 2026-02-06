#!/bin/bash

# Download GLB files and keep as GLB (iOS supports GLB in AR Quick Look)
# The issue is likely how we're opening them, not the format

echo "🔍 The GLB files should work with AR Quick Look on iOS 12+"
echo ""
echo "The problem is likely:"
echo "1. How we're opening the files (use QLPreviewController)"
echo "2. OR the file path/permissions"
echo ""
echo "USDZ is preferred but GLB should work too."
echo ""
echo "Let's try a simpler approach:"
echo "- Keep GLB files"
echo "- Use direct file:// URLs with proper iOS handling"
echo "- OR use the remote HTTPS URLs directly"
