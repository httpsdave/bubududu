'use client';

interface StatsDisplayProps {
  totalStickers: number;
  favoriteCount: number;
  downloadCount: number;
}

export default function StatsDisplay({ totalStickers, favoriteCount }: StatsDisplayProps) {
  return (
    <div className="flex items-center gap-4 mb-6 text-sm sm:text-base text-gray-700">
      <div className="flex items-center gap-1.5">
        <span className="text-lg">🎨</span>
        <span className="font-semibold">{totalStickers}</span>
        <span className="text-gray-600">Total Stickers</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-lg">❤️</span>
        <span className="font-semibold">{favoriteCount}</span>
        <span className="text-gray-600">Favorites</span>
      </div>
    </div>
  );
}
