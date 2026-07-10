# guptasajal.com

Personal site and portfolio built with Next.js (App Router), React, and Tailwind CSS. Includes landing pages, resources, blog content, and performance-optimized assets.

## Quick Start

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Scripts

- `npm run dev` - Fetch Medium content and start the dev server
- `npm run build` - Build the app (type checks skipped)
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Build with bundle analysis
- `npm run optimize-images` - Run image optimization

## Project Structure

- [src/app](src/app) - Routes and layouts (App Router)
- [src/components](src/components) - Shared React components
- [src/components/ui](src/components/ui) - UI primitives and sections
- [src/styles](src/styles) and [src/@/styles](src/@/styles) - Design system styles
- [public](public) - Public assets (images, icons, manifests)
- [scripts](scripts) - Build and content utilities

## Notes

- Content is fetched from Medium during `npm run dev` and `npm run build`.
- Asset references live in components and route files under [src](src).
