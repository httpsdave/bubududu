'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface GridSizeControlProps {
  onChange: (size: number) => void;
}

export default function GridSizeControl({ onChange }: GridSizeControlProps) {
  const [size, setSize] = useState(3);

  const handleChange = (newSize: number) => {
    setSize(newSize);
    onChange(newSize);
  };

  const sizes = [
    { value: 2, label: 'Large', cols: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3' },
    { value: 3, label: 'Medium', cols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' },
    { value: 4, label: 'Small', cols: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5' },
    { value: 5, label: 'Tiny', cols: 'grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7' },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
        {sizes.map((s) => (
          <button
            key={s.value}
            onClick={() => handleChange(s.value)}
            className={`px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors ${
              size === s.value
                ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 font-medium'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title={s.label}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
