'use client';

import { motion } from 'framer-motion';

interface ClearFiltersButtonProps {
  onClear: () => void;
  hasActiveFilters: boolean;
}

export default function ClearFiltersButton({ onClear, hasActiveFilters }: ClearFiltersButtonProps) {
  if (!hasActiveFilters) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onClear}
      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-sm font-medium"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      Clear Filters
    </motion.button>
  );
}
