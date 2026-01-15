'use client';

import { motion } from 'framer-motion';
import { useFavoritesStore } from '@/lib/store';
import { useBulkSelect } from '@/lib/bulk-select';
import { useDownloadHistory } from '@/lib/download-history';
import QuickActions from './QuickActions';
import ImageWithLoading from './ImageWithLoading';
import ZoomPreview from './ZoomPreview';
import { Sticker } from '@/lib/types';

interface StickerCardProps {
  sticker: Sticker;
  onClick: () => void;
  isSelected?: boolean;
  onToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export default function StickerCard({ sticker, onClick, isSelected = false, onToast }: StickerCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const { isSelecting, selectedIds, toggleSelect } = useBulkSelect();
  const addDownload = useDownloadHistory((state) => state.addDownload);
  const favorited = isFavorite(sticker.id);
  const isChecked = selectedIds.includes(sticker.id);

  const handleClick = () => {
    if (isSelecting) {
      toggleSelect(sticker.id);
    } else {
      onClick();
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(sticker.id);
    } else {
      addFavorite(sticker.id);
    }
  };

  const handleQuickDownload = async () => {
    try {
      const response = await fetch(sticker.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${sticker.name}.gif`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      addDownload(sticker.id, sticker.name);
      onToast?.('Downloaded!', 'success');
    } catch (error) {
      onToast?.('Download failed', 'error');
    }
  };

  const handleQuickCopy = async () => {
    try {
      const response = await fetch(sticker.url);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      onToast?.('Copied!', 'success');
    } catch (error) {
      onToast?.('Copy failed', 'error');
    }
  };

  return (
    <ZoomPreview src={sticker.url} alt={sticker.name}>
      <motion.div
        whileHover={{ scale: isSelecting ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-xl relative group ${
          isSelected ? 'ring-4 ring-primary ring-offset-2' : ''
        } ${
          isChecked ? 'ring-4 ring-blue-500 ring-offset-2' : ''
        }`}
        onClick={handleClick}
        id={`sticker-${sticker.id}`}
      >
      {isSelecting && (
        <div className="absolute top-2 left-2 z-20">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => toggleSelect(sticker.id)}
            className="w-5 h-5 text-primary focus:ring-2 focus:ring-primary rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {!isSelecting && (
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 z-20 p-1.5 sm:p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full shadow-md transition-all"
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
            fill={favorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}
      <div className="aspect-square bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-4">
        <ImageWithLoading
          src={sticker.url}
          alt={sticker.name}
          className="w-full h-full object-contain"
        />
      </div>
      {sticker.name && (
        <div className="p-2 sm:p-3">
          <p className="text-xs sm:text-sm text-center text-gray-700 truncate">
            {sticker.name}
          </p>
        </div>
      )}
    </motion.div>
    </ZoomPreview>
  );
}
