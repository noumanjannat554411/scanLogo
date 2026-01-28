# Testing Checklist

## Before Running

- [ ] Google Cloud Vision API is enabled
- [ ] API key is configured in `config.ts`
- [ ] Dependencies installed (`npm install`)
- [ ] iOS Pods installed (`cd ios && pod install`)

## iOS Testing

- [ ] Build succeeds
- [ ] Camera permission prompt appears
- [ ] Camera preview displays correctly
- [ ] Can capture photo
- [ ] Logo detection works
- [ ] Results display properly
- [ ] "Take Another" button works
- [ ] App doesn't crash on permission denial

## Android Testing

- [ ] Build succeeds
- [ ] Camera permission prompt appears
- [ ] Camera preview displays correctly
- [ ] Can capture photo
- [ ] Logo detection works
- [ ] Results display properly
- [ ] "Take Another" button works
- [ ] App doesn't crash on permission denial

## Feature Testing

### Logo Detection
- [ ] Detects Nike logo
- [ ] Detects Apple logo
- [ ] Detects Starbucks logo
- [ ] Detects McDonald's logo
- [ ] Shows confidence score
- [ ] Handles multiple logos in one image
- [ ] Shows "No logos found" message when appropriate

### Camera Controls
- [ ] "Scan Logo" button responsive
- [ ] Loading indicator shows during scan
- [ ] Image preview displays after capture
- [ ] Can retake photos
- [ ] Camera preview resumes after retake

### Error Handling
- [ ] Handles API errors gracefully
- [ ] Shows error message on network failure
- [ ] Handles invalid API key
- [ ] Works without camera permission (shows message)
- [ ] Handles no camera device scenario

### Performance
- [ ] App loads quickly
- [ ] Camera starts in <3 seconds
- [ ] API response in <5 seconds
- [ ] No memory leaks
- [ ] Smooth UI during scanning

## API Testing

- [ ] API calls successfully
- [ ] Correct payload sent
- [ ] Response parsed correctly
- [ ] API quota not exceeded
- [ ] Error responses handled

## Edge Cases

- [ ] Very small logos
- [ ] Very large logos
- [ ] Multiple logos
- [ ] No logos
- [ ] Poor lighting conditions
- [ ] Blurry images
- [ ] Rotated logos
- [ ] Partial logos

## Security

- [ ] API key not exposed in code
- [ ] API key not in git history
- [ ] config.ts in .gitignore
- [ ] HTTPS used for API calls

## Notes

Add any issues or observations here:
- 
