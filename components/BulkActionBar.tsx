'use client';

import { motion } from 'framer-motion';

interface BulkActionBarProps {
  selectedCount: number;
  onDownloadAll: () => void;
  onClearSelection: () => void;
  onAddAllToFavorites: () => void;
}

export default function BulkActionBar({
  selectedCount,
  onDownloadAll,
  onClearSelection,
  onAddAllToFavorites,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white rounded-2xl shadow-2xl px-4 sm:px-6 py-4"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-sm sm:text-base font-medium">
          {selectedCount} selected
        </span>
        <div className="flex gap-2">
          <button
            onClick={onDownloadAll}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
            title="Download all selected"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            onClick={onAddAllToFavorites}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
            title="Add all to favorites"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden sm:inline">Favorite</span>
          </button>
          <button
            onClick={onClearSelection}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
            title="Clear selection"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
