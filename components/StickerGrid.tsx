'use client';

import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import StickerCard from './StickerCard';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import SortAndView from './SortAndView';
import ClearFiltersButton from './ClearFiltersButton';
import GridSizeControl from './GridSizeControl';
import LoadMoreButton from './LoadMoreButton';
import { Sticker } from '@/lib/types';
import { getGridColumns, sortStickers } from '@/lib/utils';
import { useDownloadHistory } from '@/lib/download-history';

interface StickerGridProps {
  stickers: Sticker[];
  showFavoritesOnly: boolean;
  onToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  gridSize: number;
  onGridSizeChange: (size: number) => void;
}

export default function StickerGrid({ stickers, showFavoritesOnly, onToast, searchInputRef, gridSize, onGridSizeChange }: StickerGridProps) {
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState<'comfortable' | 'compact'>('comfortable');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [displayCount, setDisplayCount] = useState(24);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Check if filters are active
  const hasActiveFilters = searchQuery !== '' || selectedTag !== null;

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
  };

  // Get unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    stickers.forEach((sticker) => {
      sticker.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [stickers]);

  // Filter and sort stickers
  const filteredStickers = useMemo(() => {
    const filtered = stickers.filter((sticker) => {
      const matchesSearch = sticker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sticker.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = !selectedTag || sticker.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
    return sortStickers(filtered, sortBy);
  }, [stickers, searchQuery, selectedTag, sortBy]);

  // Paginated stickers
  const displayedStickers = useMemo(() => {
    return filteredStickers.slice(0, displayCount);
  }, [filteredStickers, displayCount]);

  const hasMore = displayCount < filteredStickers.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 24);
      setIsLoadingMore(false);
    }, 500);
  };

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayCount(24);
  }, [searchQuery, selectedTag, sortBy]);

  // Get grid columns based on gridSize
  const getGridColumnsClass = (size: number) => {
    switch (size) {
      case 2:
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3';
      case 3:
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
      case 4:
        return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5';
      case 5:
        return 'grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7';
      default:
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedSticker) return; // Don't navigate when modal is open
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, displayedStickers.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        setSelectedSticker(displayedStickers[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayedStickers, selectedIndex, selectedSticker]);

  return (
    <>
      <div className="space-y-4 sm:space-y-6 mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} inputRef={searchInputRef} />
          </div>
          <ClearFiltersButton onClear={handleClearFilters} hasActiveFilters={hasActiveFilters} />
        </div>
        {allTags.length > 0 && (
          <TagFilter tags={allTags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
        )}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-3 flex-wrap items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Grid:</span>
            <GridSizeControl onChange={onGridSizeChange} />
          </div>
          <div className="flex gap-3 items-center">
            <SortAndView
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>
      </div>

      {filteredStickers.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 text-lg">
            {showFavoritesOnly ? 'No favorites yet' : 'No stickers found'}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {showFavoritesOnly ? 'Start adding stickers to your favorites!' : 'Try adjusting your search or filters'}
          </p>
        </div>
      ) : (
        <>
          <div className={`grid ${getGridColumnsClass(gridSize)} gap-3 sm:gap-4 md:gap-5`}>
            {displayedStickers.map((sticker, index) => (
              <StickerCard
                key={sticker.id}
                sticker={sticker}
                onClick={() => setSelectedSticker(sticker)}
                isSelected={index === selectedIndex}
                onToast={onToast}
              />
            ))}
          </div>
          <LoadMoreButton
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            currentCount={displayedStickers.length}
            totalCount={filteredStickers.length}
            isLoading={isLoadingMore}
          />
        </>
      )}

      {selectedSticker && (
        <StickerModal
          sticker={selectedSticker}
          onClose={() => setSelectedSticker(null)}
          onToast={onToast}
        />
      )}
    </>
  );
}

function StickerModal({ sticker, onClose, onToast }: { sticker: Sticker; onClose: () => void; onToast: (message: string, type?: 'success' | 'error' | 'info') => void }) {
  const addDownload = useDownloadHistory((state) => state.addDownload);

  const handleDownload = async () => {
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
      onToast('Sticker downloaded!', 'success');
    } catch (error) {
      console.error('Download failed:', error);
      onToast('Download failed', 'error');
    }
  };

  const handleCopy = async () => {
    try {
      const response = await fetch(sticker.url);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      onToast('Copied to clipboard!', 'success');
    } catch (error) {
      console.error('Copy failed:', error);
      onToast('Copy not supported', 'error');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sticker.name,
          text: `Check out this ${sticker.name} sticker!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      onToast('Share not supported', 'info');
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{sticker.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center justify-center">
          <Image
            src={sticker.url}
            alt={sticker.name}
            width={320}
            height={320}
            className="max-w-full h-auto max-h-64 object-contain"
            sizes="(max-width: 768px) 70vw, 320px"
          />
        </div>

        {sticker.tags && sticker.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {sticker.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <button
            onClick={handleDownload}
            className="flex flex-col items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-3 rounded-xl transition-colors duration-200"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-xs">Download</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-3 rounded-xl transition-colors duration-200"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Copy</span>
          </button>
          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-3 rounded-xl transition-colors duration-200"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-xs">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
