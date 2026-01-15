'use client';

import { motion } from 'framer-motion';

interface SelectAllButtonProps {
  onSelectAll: () => void;
  onDeselectAll: () => void;
  selectedCount: number;
  totalCount: number;
  isSelecting: boolean;
}

export default function SelectAllButton({
  onSelectAll,
  onDeselectAll,
  selectedCount,
  totalCount,
  isSelecting,
}: SelectAllButtonProps) {
  if (!isSelecting || totalCount === 0) return null;

  const allSelected = selectedCount === totalCount;

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={allSelected ? onDeselectAll : onSelectAll}
      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm font-medium"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {allSelected ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        )}
      </svg>
      {allSelected ? 'Deselect All' : `Select All (${totalCount})`}
    </motion.button>
  );
}
