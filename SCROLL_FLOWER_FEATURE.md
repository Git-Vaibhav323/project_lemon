# Scroll-Based Flower Animation Feature

## Overview
This feature implements a scroll-based animation effect on the Shop page where a flower progressively opens as you scroll down and closes as you scroll up.

## Implementation Details

### Location
- **Component**: `ScrollFlowerAnimation` in `src/pages/Shop.jsx`
- **Used in**: `HeroSection` component (Shop page hero section)
- **Position**: Right side of the hero section, replacing the previous static parallax image

### How It Works

1. **Frame Sequence**: Uses 50 sequential images (ezgif-frame-001.jpg to ezgif-frame-050.jpg) from the `public/ezgif-6d2a08a35083e533-jpg/` folder

2. **Scroll Detection**: 
   - Listens to scroll events using `requestAnimationFrame` for smooth performance
   - Calculates scroll progress based on the hero section's position in the viewport
   - Maps scroll progress (0 to 1) to frame index (0 to 49)

3. **Animation Behavior**:
   - **Scroll Down**: Flower progressively opens (frames 1 → 50)
   - **Scroll Up**: Flower progressively closes (frames 50 → 1)
   - **Smooth Transition**: Uses RAF (requestAnimationFrame) for 60fps performance

### Technical Implementation

```javascript
// Frame array generation
const flowerFrames = Array.from({ length: 50 }, (_, i) => {
  const frameNum = String(i + 1).padStart(3, '0');
  return `/ezgif-6d2a08a35083e533-jpg/ezgif-frame-${frameNum}.jpg`;
});

// Scroll progress calculation
const elementCenter = rect.top + rect.height / 2;
const scrollProgress = 1 - Math.max(0, Math.min(1, elementCenter / windowHeight));
const frameIndex = Math.floor(scrollProgress * (flowerFrames.length - 1));
```

### Performance Optimizations

1. **RAF (RequestAnimationFrame)**: Ensures smooth 60fps animation
2. **Passive Event Listeners**: Improves scroll performance
3. **No Transition CSS**: Removes transition delay for instant frame switching
4. **Cleanup**: Properly removes event listeners and cancels RAF on unmount

## Files Modified

- `src/pages/Shop.jsx`:
  - Added `flowerFrames` array constant
  - Created `ScrollFlowerAnimation` component
  - Updated `HeroSection` to use the new animation component

## Assets

- **Source Folder**: `ezgif-6d2a08a35083e533-jpg/` (50 JPG images)
- **Public Folder**: `public/ezgif-6d2a08a35083e533-jpg/` (copied for web access)
- **Frame Format**: `ezgif-frame-XXX.jpg` (where XXX is 001-050)

## Testing

To test the feature:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Shop page (click "Shop" in navigation or go to `#shop`)

3. Scroll down and up to see the flower animation:
   - Flower should start closed at the top
   - Progressively open as you scroll down
   - Close back as you scroll up

## Browser Compatibility

- Modern browsers with ES6+ support
- RequestAnimationFrame support (all modern browsers)
- CSS mask-image support (webkit prefix included for Safari)

## Future Enhancements

Possible improvements:
- Preload all frames for smoother initial experience
- Add loading state while frames are loading
- Optimize image sizes for faster loading
- Add touch/gesture support for mobile devices
- Configurable scroll sensitivity
