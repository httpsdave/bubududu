'use client';

import './globals.css';
import { useEffect } from 'react';
import { useTheme } from '@/lib/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <html lang="en" className={theme}>
      <head>
        <title>BubuDudu Stickers</title>
        <meta name="description" content="Cute stickers and GIFs collection - Download and share!" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#2DD4BF" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BubuDudu" />
      </head>
      <body className="antialiased bg-background dark:bg-gray-900 min-h-screen transition-colors">
        {children}
      </body>
    </html>
  );
}
