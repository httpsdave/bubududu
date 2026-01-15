import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DownloadHistoryItem {
  id: string;
  name: string;
  timestamp: number;
}

interface DownloadHistoryState {
  history: DownloadHistoryItem[];
  addDownload: (id: string, name: string) => void;
  clearHistory: () => void;
  getRecentDownloads: (limit?: number) => DownloadHistoryItem[];
}

export const useDownloadHistory = create<DownloadHistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      addDownload: (id, name) =>
        set((state) => ({
          history: [
            { id, name, timestamp: Date.now() },
            ...state.history.slice(0, 49), // Keep last 50
          ],
        })),
      clearHistory: () => set({ history: [] }),
      getRecentDownloads: (limit = 10) => get().history.slice(0, limit),
    }),
    {
      name: 'bubududu-downloads',
    }
  )
);
