'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { TSPCity } from '@/lib/gameData';

interface TSPCanvasProps {
  cities: TSPCity[];
  visitedCities: TSPCity[];
  onCitySelect: (city: TSPCity) => void;
}

export default function TSPCanvas({
  cities,
  visitedCities,
  onCitySelect
}: TSPCanvasProps) {
  const calculateDistance = (city1: TSPCity, city2: TSPCity) => {
    return Math.sqrt(
      Math.pow(city1.x - city2.x, 2) + Math.pow(city1.y - city2.y, 2)
    );
  };

  const drawPath = () => {
    if (visitedCities.length < 2) return null;

    const pathElements = [];
    for (let i = 1; i < visitedCities.length; i++) {
      const from = visitedCities[i - 1];
      const to = visitedCities[i];
      const distance = calculateDistance(from, to);

      pathElements.push(
        <motion.line
          key={`path-${i}`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          x1={from.x * 4}
          y1={from.y * 4}
          x2={to.x * 4}
          y2={to.y * 4}
          stroke="url(#pathGradient)"
          strokeWidth="3"
          strokeDasharray="5,5"
        />
      );
    }

    return pathElements;
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-slate-800/50 to-blue-900/30 rounded-lg overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-1 h-1 bg-white rounded-full opacity-60" />
        <div className="absolute top-32 right-16 w-1 h-1 bg-white rounded-full opacity-40" />
        <div className="absolute bottom-24 left-32 w-1 h-1 bg-white rounded-full opacity-50" />
        <div className="absolute top-48 left-1/2 w-1 h-1 bg-white rounded-full opacity-70" />
      </div>

      {/* SVG for paths */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        {drawPath()}
      </svg>

      {/* Cities */}
      <div className="relative w-full h-full">
        {cities.map((city, index) => {
          const isVisited = visitedCities.some(visited => visited.id === city.id);
          const visitOrder = visitedCities.findIndex(visited => visited.id === city.id);
          const isLast = visitOrder === visitedCities.length - 1;

          return (
            <motion.div
              key={city.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!isVisited ? { scale: 1.2 } : {}}
              whileTap={{ scale: 0.9 }}
              onClick={() => onCitySelect(city)}
              className={`
                absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2
                ${isVisited ? 'cursor-default' : 'cursor-pointer'}
              `}
              style={{
                left: `${city.x * 4}px`,
                top: `${city.y * 4}px`,
              }}
            >
              {/* City Glow */}
              <motion.div
                animate={isLast ? {
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.8)',
                    '0 0 40px rgba(59, 130, 246, 1)',
                    '0 0 20px rgba(59, 130, 246, 0.8)'
                  ]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center relative
                  ${isVisited 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-cyan-400' 
                    : 'bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-500 hover:border-blue-400'
                  }
                  ${isLast ? 'ring-4 ring-blue-400/50' : ''}
                `}
              >
                <MapPin 
                  className={`w-8 h-8 ${
                    isVisited ? 'text-white' : 'text-gray-300'
                  }`}
                />
                
                {/* Visit Order */}
                {isVisited && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <span className="text-black text-xs font-bold">
                      {visitOrder + 1}
                    </span>
                  </motion.div>
                )}

                {/* Pulse Effect for Current Target */}
                {!isVisited && visitedCities.length > 0 && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-blue-400 rounded-full"
                  />
                )}
              </motion.div>

              {/* City Name */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                <div className={`text-sm font-semibold ${
                  isVisited ? 'text-cyan-400' : 'text-gray-300'
                }`}>
                  {city.name}
                </div>
              </div>

              {/* Sparkle Effects for Visited Cities */}
              {isVisited && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-300 rounded-full" />
                  <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-blue-300 rounded-full" />
                  <div className="absolute -top-1 -right-1 w-1 h-1 bg-purple-300 rounded-full" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Connection Preview */}
      {visitedCities.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-black/50 rounded-lg p-3 text-white text-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            Current Path Length: <span className="text-cyan-400 font-bold">
              {visitedCities.reduce((total, city, index) => {
                if (index === 0) return 0;
                return total + calculateDistance(visitedCities[index - 1], city);
              }, 0).toFixed(1)} leagues
            </span>
          </div>
          {visitedCities.length === cities.length && (
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              Return to start: +{calculateDistance(visitedCities[visitedCities.length - 1], visitedCities[0]).toFixed(1)} leagues
            </div>
          )}
        </div>
      )}
    </div>
  );
}