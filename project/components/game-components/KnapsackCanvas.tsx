'use client';

import { motion } from 'framer-motion';
import { Gem, Package } from 'lucide-react';
import { KnapsackItem } from '@/lib/gameData';

interface KnapsackCanvasProps {
  items: KnapsackItem[];
  selectedItems: KnapsackItem[];
  onItemSelect: (item: KnapsackItem) => void;
  capacity: number;
  currentWeight: number;
}

export default function KnapsackCanvas({
  items,
  selectedItems,
  onItemSelect,
  capacity,
  currentWeight
}: KnapsackCanvasProps) {
  const isOverCapacity = currentWeight > capacity;
  
  return (
    <div className="h-full flex flex-col">
      {/* Bag Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Package className="w-5 h-5" />
            Your Adventurer's Bag
          </h3>
          <div className={`text-sm ${isOverCapacity ? 'text-red-400' : 'text-green-400'}`}>
            {currentWeight.toFixed(1)} / {capacity} kg
            {isOverCapacity && ' (Overloaded!)'}
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (currentWeight / capacity) * 100)}%` }}
            className={`h-3 rounded-full transition-colors duration-300 ${
              isOverCapacity 
                ? 'bg-gradient-to-r from-red-500 to-red-600' 
                : 'bg-gradient-to-r from-green-500 to-green-600'
            }`}
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const isSelected = selectedItems.some(selected => selected.id === item.id);
            
            return (
              <motion.div
                key={item.id}
                layout
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onItemSelect(item)}
                className={`
                  relative cursor-pointer p-4 rounded-xl border-2 transition-all duration-300
                  ${isSelected 
                    ? 'border-yellow-400 bg-yellow-500/20 shadow-lg shadow-yellow-400/20' 
                    : 'border-gray-600 bg-gray-800/50 hover:border-orange-400 hover:bg-orange-500/10'
                  }
                `}
              >
                {/* Item Visual */}
                <div className="text-center mb-3">
                  <motion.div
                    animate={{ 
                      rotate: isSelected ? [0, -5, 5, 0] : 0,
                      scale: isSelected ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    <Gem 
                      className={`w-12 h-12 mx-auto ${
                        isSelected ? 'text-yellow-400' : 'text-orange-400'
                      }`} 
                    />
                  </motion.div>
                </div>

                {/* Item Info */}
                <div className="text-center">
                  <h4 className="text-white font-semibold text-sm mb-1">{item.name}</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-yellow-400">{item.value}g</span>
                    <span className="text-gray-400">{item.weight}kg</span>
                  </div>
                  <div className="text-xs text-purple-400 mt-1">
                    Ratio: {(item.value / item.weight).toFixed(1)}
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <span className="text-black text-xs font-bold">✓</span>
                  </motion.div>
                )}

                {/* Sparkle Effect for Selected Items */}
                {isSelected && (
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-300 rounded-full" />
                    <div className="absolute top-3 right-2 w-1 h-1 bg-yellow-300 rounded-full" />
                    <div className="absolute bottom-2 left-3 w-1 h-1 bg-yellow-300 rounded-full" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}