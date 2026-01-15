'use client';

interface StatsDisplayProps {
  totalStickers: number;
  favoriteCount: number;
  downloadCount: number;
}

export default function StatsDisplay({ totalStickers, favoriteCount, downloadCount }: StatsDisplayProps) {
  const stats = [
    { label: 'Total Stickers', value: totalStickers, icon: '🎨' },
    { label: 'Favorites', value: favoriteCount, icon: '❤️' },
    { label: 'Downloads', value: downloadCount, icon: '⬇️' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl shadow-md p-3 sm:p-4 text-center"
        >
          <div className="text-2xl sm:text-3xl mb-1">{stat.icon}</div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
