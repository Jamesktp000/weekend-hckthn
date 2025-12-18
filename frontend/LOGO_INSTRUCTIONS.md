# Logo Replacement Instructions

## How to Replace the Logo

1. **Add your logo image** to the `frontend/public` folder (create it if it doesn't exist)
   - Supported formats: PNG, SVG, JPG, WebP
   - Recommended size: 40x40 pixels or larger (will be scaled to 40x40)

2. **Update the Navbar component** at `frontend/src/components/Navbar.tsx`

Replace this section:
```tsx
<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-xl">Logo</span>
</div>
```

With this (using Next.js Image component):
```tsx
<Image
  src="/your-logo.png"
  alt="Company Logo"
  width={40}
  height={40}
  className="rounded-lg"
/>
```

Or with a regular img tag:
```tsx
<img
  src="/your-logo.png"
  alt="Company Logo"
  className="w-10 h-10 rounded-lg object-contain"
/>
```

## Example

If your logo file is `frontend/public/logo.svg`, use:
```tsx
<Image
  src="/logo.svg"
  alt="Company Logo"
  width={40}
  height={40}
  className="rounded-lg"
/>
```
