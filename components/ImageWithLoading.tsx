'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

export default function ImageWithLoading({ src, alt, className = '', onLoad }: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
    setHasError(false);

    // Set a timeout as a fallback - if image doesn't load in 10 seconds, force check
    timeoutRef.current = setTimeout(() => {
      if (imgRef.current?.complete && imgRef.current?.naturalHeight > 0) {
        // Image is actually loaded but event didn't fire
        setIsLoading(false);
      }
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [src]);

  const handleLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )}
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
