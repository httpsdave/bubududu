'use client';

import { motion } from 'framer-motion';

interface RandomStickerButtonProps {
  onRandomSelect: () => void;
  disabled?: boolean;
}

export default function RandomStickerButton({ onRandomSelect, disabled }: RandomStickerButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRandomSelect}
      disabled={disabled}
      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-white rounded-lg transition-all text-sm font-medium shadow-md hover:shadow-lg disabled:cursor-not-allowed"
      title="Get a random sticker"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
      <span className="hidden sm:inline">Random</span>
      <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    </motion.button>
  );
}
