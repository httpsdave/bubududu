import { create } from 'zustand';

interface BulkSelectState {
  selectedIds: string[];
  isSelecting: boolean;
  toggleSelect: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  setSelecting: (selecting: boolean) => void;
}

export const useBulkSelect = create<BulkSelectState>((set, get) => ({
  selectedIds: [],
  isSelecting: false,
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedIds, id],
    })),
  selectAll: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [], isSelecting: false }),
  setSelecting: (selecting) => set({ isSelecting: selecting }),
}));
