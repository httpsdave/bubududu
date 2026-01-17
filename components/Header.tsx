'use client';

import Image from 'next/image';
import { useFavoritesStore } from '@/lib/store';
import { useTheme } from '@/lib/theme';
import { useBulkSelect } from '@/lib/bulk-select';

interface HeaderProps {
  onShowFavorites: () => void;
  showingFavorites: boolean;
  onShowShortcuts: () => void;
}

export default function Header({ onShowFavorites, showingFavorites, onShowShortcuts }: HeaderProps) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const { theme, toggleTheme } = useTheme();
  const { isSelecting, setSelecting, clearSelection } = useBulkSelect();

  const handleBulkToggle = () => {
    if (isSelecting) {
      clearSelection();
    } else {
      setSelecting(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md mb-4 sm:mb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 sm:h-24">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/bubududu-logo.png"
              alt="BubuDudu logo"
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 object-contain"
              priority
            />
            <h1 className="text-lg sm:text-2xl font-bold text-white">BubuDudu</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handleBulkToggle}
              className={`p-2 rounded-lg transition-colors ${
                isSelecting ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              aria-label="Bulk select"
              title="Bulk select (B)"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
              title="Toggle theme (T)"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            <button
              onClick={onShowShortcuts}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden sm:block"
              aria-label="Keyboard shortcuts"
              title="Keyboard shortcuts (K)"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
            <button
              onClick={onShowFavorites}
              className={`relative p-2 rounded-lg transition-colors ${
                showingFavorites ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              aria-label="Favorites"
              title="Favorites (F)"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill={showingFavorites ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
