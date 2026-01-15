# BubuDudu Stickers

A modern, mobile-first sticker gallery website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 📱 Mobile-first responsive design
- 🎨 Clean and modern UI
- 💾 Download stickers with one click
- ⚡ Optimized performance with Next.js 15
- 🎭 Smooth animations with Framer Motion
- 🚀 Ready for Vercel deployment

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **State Management:** Zustand (included)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Header.tsx       # Header component
│   ├── StickerGrid.tsx  # Grid layout
│   └── StickerCard.tsx  # Individual sticker card
├── lib/                 # Utilities and data
│   ├── types.ts         # TypeScript types
│   └── stickers-data.ts # Sticker data
└── public/              # Static assets
```

## Customization

### Adding Real Stickers

Replace the placeholder data in `lib/stickers-data.ts` with your actual sticker URLs:

```typescript
export const stickersData: Sticker[] = [
  {
    id: '1',
    name: 'Your Sticker Name',
    url: '/stickers/your-sticker.gif',
    tags: ['cute', 'happy'],
  },
  // ... more stickers
];
```

### Styling

- Colors are defined in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component-specific styles use Tailwind utility classes

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click!

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

## License

MIT
