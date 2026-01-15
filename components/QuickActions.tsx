'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickActionsProps {
  stickerId: string;
  stickerName: string;
  stickerUrl: string;
  onDownload: () => void;
  onCopy: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function QuickActions({
  stickerId,
  stickerName,
  stickerUrl,
  onDownload,
  onCopy,
  isFavorite,
  onToggleFavorite,
}: QuickActionsProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyLink = async () => {
    const link = `${window.location.origin}?sticker=${stickerId}`;
    await navigator.clipboard.writeText(link);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 z-10">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        title="Quick download"
      >
        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCopy();
        }}
        className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        title="Copy to clipboard"
      >
        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleCopyLink();
        }}
        className="relative p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        title="Copy link"
      >
        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <AnimatePresence>
          {showCopied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
            >
              Link copied!
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
