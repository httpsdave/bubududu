'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ZoomPreviewProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export default function ZoomPreview({ src, alt, children }: ZoomPreviewProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate position for zoom preview
    const previewX = e.clientX + 20;
    const previewY = e.clientY + 20;
    
    setPosition({ x: previewX, y: previewY });
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
      
      {isHovering && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed z-[60] pointer-events-none hidden lg:block"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-2xl border-2 border-primary">
            <Image
              src={src}
              alt={alt}
              width={128}
              height={128}
              className="w-32 h-32 object-contain"
              sizes="128px"
            />
          </div>
        </motion.div>
      )}
    </>
  );
}
