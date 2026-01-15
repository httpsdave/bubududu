import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BubuDudu Stickers',
  description: 'Cute stickers and GIFs collection - Download and share!',
  manifest: '/manifest.json',
  themeColor: '#2DD4BF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BubuDudu',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
};
