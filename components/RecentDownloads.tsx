'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDownloadHistory } from '@/lib/download-history';
import { stickersData } from '@/lib/stickers-data';

interface RecentDownloadsProps {
  onStickerClick: (stickerId: string) => void;
}

export default function RecentDownloads({ onStickerClick }: RecentDownloadsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { history } = useDownloadHistory();

  const recentStickers = history
    .slice(0, 5)
    .map((item) => stickersData.find((s) => s.id === item.id))
    .filter(Boolean);

  if (history.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
      >
        <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-gray-700 dark:text-gray-200">Recent ({history.length})</span>
        <svg className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 p-3"
          >
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Recent Downloads</div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentStickers.map((sticker) => (
                <button
                  key={sticker!.id}
                  onClick={() => {
                    onStickerClick(sticker!.id);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <img src={sticker!.url} alt={sticker!.name} className="w-10 h-10 object-contain bg-gray-100 dark:bg-gray-700 rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-200 truncate flex-1">{sticker!.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
