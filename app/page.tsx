'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import StickerGrid from '@/components/StickerGrid';
import StatsDisplay from '@/components/StatsDisplay';
import BulkActionBar from '@/components/BulkActionBar';
import RecentDownloads from '@/components/RecentDownloads';
import ExportFavoritesButton from '@/components/ExportFavoritesButton';
import SelectAllButton from '@/components/SelectAllButton';
import ScrollToTop from '@/components/ScrollToTop';
import InstallPrompt from '@/components/InstallPrompt';
import RandomStickerButton from '@/components/RandomStickerButton';
import ShareCollectionModal from '@/components/ShareCollectionModal';
import PrintButton from '@/components/PrintButton';
import { ToastContainer } from '@/components/Toast';
import KeyboardShortcutsModal from '@/components/KeyboardShortcutsModal';
import { stickersData } from '@/lib/stickers-data';
import { useFavoritesStore } from '@/lib/store';
import { useBulkSelect } from '@/lib/bulk-select';
import { useDownloadHistory } from '@/lib/download-history';
import { useTheme } from '@/lib/theme';

export default function Home() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [gridSize, setGridSize] = useState(3);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type?: 'success' | 'error' | 'info' }>>([]);
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const { selectedIds, clearSelection, isSelecting, setSelecting } = useBulkSelect();
  const { history } = useDownloadHistory();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Load shared collection from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const collectionIds = params.get('collection');
      if (collectionIds) {
        const ids = collectionIds.split(',');
        const { setSelecting, selectAll } = useBulkSelect.getState();
        setSelecting(true);
        selectAll(ids);
        addToast(`Loaded shared collection with ${ids.length} stickers!`, 'info');
      }
    }
  }, []);

  const displayedStickers = useMemo(() => {
    if (showFavoritesOnly) {
      return stickersData.filter((sticker) => favorites.includes(sticker.id));
    }
    return stickersData;
  }, [showFavoritesOnly, favorites]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleDownloadAll = async () => {
    const selectedStickers = stickersData.filter((s) => selectedIds.includes(s.id));
    let successCount = 0;
    
    for (const sticker of selectedStickers) {
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
        successCount++;
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay between downloads
      } catch (error) {
        console.error('Download failed:', error);
      }
    }
    
    addToast(`Downloaded ${successCount} stickers!`, 'success');
    clearSelection();
  };

  const handleAddAllToFavorites = () => {
    selectedIds.forEach((id) => {
      if (!favorites.includes(id)) {
        addFavorite(id);
      }
    });
    addToast(`Added ${selectedIds.length} to favorites!`, 'success');
    clearSelection();
  };

  const handleExportFavorites = async () => {
    const favoriteStickers = stickersData.filter((s) => favorites.includes(s.id));
    let successCount = 0;
    
    for (const sticker of favoriteStickers) {
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
        successCount++;
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Export failed:', error);
      }
    }
    
    addToast(`Exported ${successCount} favorites!`, 'success');
  };

  const handleRecentStickerClick = (stickerId: string) => {
    const element = document.getElementById(`sticker-${stickerId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-4', 'ring-primary', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-primary', 'ring-offset-2');
      }, 2000);
    }
  };

  const handleSelectAll = () => {
    const allIds = displayedStickers.map((s) => s.id);
    useBulkSelect.getState().selectAll(allIds);
  };

  const handleDeselectAll = () => {
    clearSelection();
  };

  const handleRandomSticker = () => {
    if (displayedStickers.length === 0) return;
    const randomIndex = Math.floor(Math.random() * displayedStickers.length);
    const randomSticker = displayedStickers[randomIndex];
    const element = document.getElementById(`sticker-${randomSticker.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-4', 'ring-primary', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-primary', 'ring-offset-2');
      }, 2000);
    }
    addToast(`🎲 ${randomSticker.name}`, 'info');
  };

  const handlePrint = () => {
    if (selectedIds.length === 0) return;
    
    const selectedStickers = stickersData.filter((s) => selectedIds.includes(s.id));
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Stickers</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
            .sticker { text-align: center; break-inside: avoid; }
            .sticker img { max-width: 100%; height: auto; border: 2px solid #e5e7eb; border-radius: 8px; }
            .sticker h3 { margin: 10px 0 5px; font-size: 14px; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <h1 class="no-print">Stickers - ${selectedStickers.length} selected</h1>
          <button class="no-print" onclick="window.print()" style="padding: 10px 20px; margin-bottom: 20px; cursor: pointer;">Print</button>
          <div class="grid">
            ${selectedStickers.map(s => `
              <div class="sticker">
                <img src="${s.url}" alt="${s.name}" />
                <h3>${s.name}</h3>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === 'Escape') {
          (e.target as HTMLInputElement).blur();
        }
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'k':
          e.preventDefault();
          setShowShortcuts(true);
          break;
        case 'f':
          e.preventDefault();
          setShowFavoritesOnly((prev) => !prev);
          break;
        case 'b':
          e.preventDefault();
          setSelecting(!isSelecting);
          if (isSelecting) clearSelection();
          break;
        case 'a':
          if (isSelecting) {
            e.preventDefault();
            handleSelectAll();
          }
          break;
        case 't':
          e.preventDefault();
          useTheme.getState().toggleTheme();
          break;
        case 's':
          if (isSelecting && selectedIds.length > 0) {
            e.preventDefault();
            setShowShareModal(true);
          }
          break;
        case 'r':
          e.preventDefault();
          handleRandomSticker();
          break;
        case '/':
          e.preventDefault();
          searchInputRef.current?.focus();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSelecting, clearSelection, handleSelectAll, handleRandomSticker, selectedIds.length, setSelecting]);

  return (
    <main className="min-h-screen pb-20 bg-background dark:bg-gray-900 transition-colors">
      <Header
        onShowFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        showingFavorites={showFavoritesOnly}
        onShowShortcuts={() => setShowShortcuts(true)}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <StatsDisplay
          totalStickers={stickersData.length}
          favoriteCount={favorites.length}
          downloadCount={history.length}
        />
        <div className="flex flex-wrap gap-3 mb-4">
          <RecentDownloads onStickerClick={handleRecentStickerClick} />
          {showFavoritesOnly && (
            <ExportFavoritesButton onExport={handleExportFavorites} favoritesCount={favorites.length} />
          )}
          <SelectAllButton
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            selectedCount={selectedIds.length}
            totalCount={displayedStickers.length}
            isSelecting={isSelecting}
          />
          <RandomStickerButton onRandomSelect={handleRandomSticker} disabled={displayedStickers.length === 0} />
          {isSelecting && selectedIds.length > 0 && (
            <>
              <PrintButton onPrint={handlePrint} count={selectedIds.length} />
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="hidden sm:inline">Share</span>
              </button>
            </>
          )}
        </div>
        {showFavoritesOnly && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Showing {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}</span>
          </div>
        )}
        {isSelecting && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Bulk select mode active - Click stickers to select them</span>
          </div>
        )}
        <StickerGrid
          stickers={displayedStickers}
          showFavoritesOnly={showFavoritesOnly}
          onToast={addToast}
          searchInputRef={searchInputRef}
          gridSize={gridSize}
          onGridSizeChange={setGridSize}
        />
      </div>
      <BulkActionBar
        selectedCount={selectedIds.length}
        onDownloadAll={handleDownloadAll}
        onClearSelection={clearSelection}
        onAddAllToFavorites={handleAddAllToFavorites}
      />
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
      <ScrollToTop />
      <InstallPrompt />
      <ShareCollectionModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        stickerIds={selectedIds}
      />
    </main>
  );
}
