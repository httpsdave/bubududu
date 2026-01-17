'use client';

import { useState } from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export default function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  const [showAll, setShowAll] = useState(false);
  const initialTagCount = 20;
  const visibleTags = showAll ? tags : tags.slice(0, initialTagCount);
  const hasMoreTags = tags.length > initialTagCount;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagSelect(null)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
            selectedTag === null
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          All
        </button>
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors capitalize ${
              selectedTag === tag
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      {hasMoreTags && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
        >
          {showAll ? (
            <>
              Show Less
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </>
          ) : (
            <>
              Show More ({tags.length - initialTagCount} more)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
}
