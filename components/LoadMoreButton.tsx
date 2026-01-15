'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  hasMore: boolean;
  currentCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export default function LoadMoreButton({
  onLoadMore,
  hasMore,
  currentCount,
  totalCount,
  isLoading,
}: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {currentCount} of {totalCount} stickers
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLoadMore}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white rounded-xl transition-colors font-medium shadow-md hover:shadow-lg disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Loading...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Load More Stickers
          </>
        )}
      </motion.button>
    </div>
  );
}
