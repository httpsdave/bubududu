'use client';

import { motion } from 'framer-motion';

interface ExportFavoritesButtonProps {
  onExport: () => void;
  favoritesCount: number;
}

export default function ExportFavoritesButton({ onExport, favoritesCount }: ExportFavoritesButtonProps) {
  if (favoritesCount === 0) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={onExport}
      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-pink-500 text-white hover:bg-pink-600 rounded-lg transition-all text-sm font-medium shadow-md hover:shadow-lg"
      title={`Download all ${favoritesCount} favorites`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span className="hidden sm:inline">Export All Favorites</span>
      <span className="sm:hidden">Export ({favoritesCount})</span>
    </motion.button>
  );
}
