'use client';

interface SortOption {
  label: string;
  value: 'name-asc' | 'name-desc' | 'recent';
}

const sortOptions: SortOption[] = [
  { label: 'Name A-Z', value: 'name-asc' },
  { label: 'Name Z-A', value: 'name-desc' },
  { label: 'Recently Added', value: 'recent' },
];

interface SortAndViewProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: 'comfortable' | 'compact';
  onViewModeChange: (mode: 'comfortable' | 'compact') => void;
}

export default function SortAndView({ sortBy, onSortChange, viewMode, onViewModeChange }: SortAndViewProps) {
  return (
    <div className="flex items-center justify-between gap-3 sm:gap-4">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="flex-1 sm:flex-none px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
        <button
          onClick={() => onViewModeChange('comfortable')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'comfortable' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          aria-label="Comfortable view"
          title="Comfortable view"
        >
          <svg className="w-4 h-4 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button
          onClick={() => onViewModeChange('compact')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'compact' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          aria-label="Compact view"
          title="Compact view"
        >
          <svg className="w-4 h-4 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
