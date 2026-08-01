# VHIR Tech — Assets Directory

Place your brand assets here:

- `logo.png` — VHIR Tech logo (recommended: 512x512px, transparent PNG)
- `favicon.ico` — Browser favicon (32x32 or 64x64)
- `apple-touch-icon.png` — Apple touch icon (180x180)
- `og-image.png` — Open Graph social sharing image (1200x630)

## How to Connect These Assets

1. **Logo**: Replace the SVG placeholder in `src/components/Header.tsx` with:
   ```tsx
   <Image src="/assets/logo.png" alt="VHIR Tech" width={40} height={40} />
   ```

2. **Favicon**: Already linked in `src/app/layout.tsx` → `icons: { icon: '/assets/favicon.ico' }`

3. **OG Image**: Already linked in `src/app/layout.tsx` → `openGraph.images`

4. **Apple Touch Icon**: Already linked in `src/app/layout.tsx` → `icons: { apple: '/assets/apple-touch-icon.png' }`
