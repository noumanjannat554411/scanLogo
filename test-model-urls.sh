#!/bin/bash

# 🧪 Quick Model URL Test Script
# This script tests if your Firebase Storage URLs are accessible

echo "🧪 Testing Building Model URLs..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Model URLs
declare -a urls=(
    "https://firebasestorage.googleapis.com/v0/b/fix-it-dev.firebasestorage.app/o/modal%2F111w57_-_steinway_tower.glb?alt=media&token=ce45df13-9861-49a4-8006-1ae165e095d8"
    "https://firebasestorage.googleapis.com/v0/b/fix-it-dev.firebasestorage.app/o/modal%2Fbuildings_for_3d_printing.glb?alt=media&token=d667bdf7-88cf-4621-821a-fa7e3a20fb78"
    "https://firebasestorage.googleapis.com/v0/b/fix-it-dev.firebasestorage.app/o/modal%2Ffuturistic_building.glb?alt=media&token=e9267072-1be1-4a51-8300-9f699fb7e284"
    "https://firebasestorage.googleapis.com/v0/b/fix-it-dev.firebasestorage.app/o/modal%2Fmodern_tower_office_apartment_building.glb?alt=media&token=c98ddb94-86eb-4fdd-8a35-a317a12bc2f0"
)

declare -a names=(
    "Steinway Tower"
    "Buildings for 3D Printing"
    "Futuristic Building"
    "Modern Tower Office Complex"
)

# Test each URL
for i in "${!urls[@]}"; do
    echo -e "${YELLOW}Testing: ${names[$i]}${NC}"
    
    # Get HTTP status code
    status_code=$(curl -o /dev/null -s -w "%{http_code}" -L "${urls[$i]}")
    
    if [ "$status_code" == "200" ]; then
        # Get file size
        size=$(curl -sI "${urls[$i]}" | grep -i content-length | awk '{print $2}' | tr -d '\r')
        size_mb=$(echo "scale=2; $size/1024/1024" | bc)
        echo -e "  ${GREEN}✅ Accessible (HTTP $status_code)${NC}"
        echo -e "  📦 File size: ${size_mb} MB"
    else
        echo -e "  ${RED}❌ Not accessible (HTTP $status_code)${NC}"
        echo -e "  ${RED}⚠️  Check Firebase Storage rules!${NC}"
    fi
    echo ""
done

echo "=================================================="
echo "📝 Summary:"
echo ""
echo "If all URLs show ✅, your models are ready to use!"
echo "If any show ❌, check Firebase Storage rules:"
echo "  1. Go to Firebase Console → Storage → Rules"
echo "  2. Make sure 'allow read: if true;' is set"
echo "  3. Publish the rules"
echo ""
echo "To run this test again:"
echo "  bash test-model-urls.sh"
echo "=================================================="
