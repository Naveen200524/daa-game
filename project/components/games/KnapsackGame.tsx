'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Lightbulb, Send, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KnapsackCanvas from '@/components/game-components/KnapsackCanvas';
import GameControls from '@/components/game-components/GameControls';
import ResultsModal from '@/components/game-components/ResultsModal';
import DifficultySelector from '@/components/game-components/DifficultySelector';
import { knapsackLevels, KnapsackItem, GameStats } from '@/lib/gameData';

export default function KnapsackGame() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedItems, setSelectedItems] = useState<KnapsackItem[]>([]);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);

  const currentLevel = knapsackLevels[difficulty];

  const handleItemSelect = useCallback((item: KnapsackItem) => {
    const isSelected = selectedItems.some(selected => selected.id === item.id);
    
    if (isSelected) {
      // Remove item
      const newSelected = selectedItems.filter(selected => selected.id !== item.id);
      setSelectedItems(newSelected);
      setCurrentWeight(currentWeight - item.weight);
      setCurrentValue(currentValue - item.value);
    } else {
      // Add item
      const newWeight = currentWeight + item.weight;
      if (newWeight > currentLevel.capacity) {
        setMistakes(prev => prev + 1);
        // Still allow the selection for learning purposes
      }
      setSelectedItems([...selectedItems, item]);
      setCurrentWeight(newWeight);
      setCurrentValue(currentValue + item.value);
    }
  }, [selectedItems, currentWeight, currentValue, currentLevel.capacity]);

  const handleReset = () => {
    setSelectedItems([]);
    setCurrentWeight(0);
    setCurrentValue(0);
    setMistakes(0);
    setHintsUsed(0);
  };

  const handleHint = () => {
    setHintsUsed(prev => prev + 1);
    // Simple greedy hint: suggest highest value-to-weight ratio item not yet selected
    const availableItems = currentLevel.items.filter(
      item => !selectedItems.some(selected => selected.id === item.id)
    );
    
    if (availableItems.length === 0) return;
    
    const bestRatio = availableItems.reduce((best, item) => {
      const ratio = item.value / item.weight;
      const bestRatio = best.value / best.weight;
      return ratio > bestRatio ? item : best;
    });
    
    // Highlight the suggested item (you could add visual feedback here)
    console.log(`Hint: Consider the ${bestRatio.name} (${bestRatio.value} gold, ${bestRatio.weight}kg)`);
  };

  const handleSubmit = () => {
    // Calculate optimal solution using dynamic programming
    const { maxValue, optimalItems } = solveKnapsack(currentLevel.items, currentLevel.capacity);
    
    // Calculate score
    const efficiency = currentValue / maxValue;
    let baseScore = Math.round(efficiency * 1000);
    const hintPenalty = hintsUsed * 50;
    const mistakePenalty = mistakes * 25;
    const finalScore = Math.max(0, baseScore - hintPenalty - mistakePenalty);
    
    const stats: GameStats = {
      score: finalScore,
      mistakes,
      hintsUsed,
      efficiency: efficiency * 100,
      userSolution: selectedItems,
      optimalSolution: optimalItems,
      userValue: currentValue,
      optimalValue: maxValue,
      explanation: generateExplanation(currentLevel.items, currentLevel.capacity, optimalItems)
    };
    
    setGameStats(stats);
    setShowResults(true);
  };

  const startGame = () => {
    setGameStarted(true);
    handleReset();
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900/20 to-red-900/20 text-white"> {/* Added 'text-white' for visibility */}
        <DifficultySelector
          title="Goblin Adventure"
          subtitle="Knapsack Puzzle"
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          onStartGame={startGame}
          onBack={() => router.push('/')}
          theme="cave"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900/20 to-red-900/20 relative overflow-hidden text-white"> {/* Added 'text-white' for visibility */}
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-3 h-3 bg-orange-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute top-32 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-red-400 rounded-full animate-pulse opacity-30" />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Goblin Adventure</h1>
              <p className="text-orange-400 capitalize">{difficulty} Mode</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-white">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span>Score: {Math.max(0, 1000 - hintsUsed * 50 - mistakes * 25)}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <Card className="bg-black/20 border-orange-500/20 backdrop-blur-sm h-[600px]">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Treasure Cave</span>
                  <div className="text-sm text-orange-400">
                    Capacity: {currentWeight}/{currentLevel.capacity} kg
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-6">
                <KnapsackCanvas 
                  items={currentLevel.items}
                  selectedItems={selectedItems}
                  onItemSelect={handleItemSelect}
                  capacity={currentLevel.capacity}
                  currentWeight={currentWeight}
                />
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-black/20 border-orange-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-orange-400">Your Bag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{currentValue}</div>
                  <div className="text-sm text-gray-300">Total Gold</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">{selectedItems.length}</div>
                  <div className="text-sm text-gray-300">Items Selected</div>
                </div>
                <div className="space-y-1">
                  {selectedItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-gray-300 flex justify-between"
                    >
                      <span>{item.name}</span>
                      <span className="text-yellow-400">{item.value}g</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <GameControls
              onReset={handleReset}
              onHint={handleHint}
              onSubmit={handleSubmit}
              canSubmit={selectedItems.length > 0}
              hintsUsed={hintsUsed}
              mistakes={mistakes}
            />
          </div>
        </div>
      </div>

      {/* Results Modal */}
      <AnimatePresence>
        {showResults && gameStats && (
          <ResultsModal
            gameType="knapsack"
            stats={gameStats}
            onClose={() => setShowResults(false)}
            onPlayAgain={() => {
              setShowResults(false);
              handleReset();
            }}
            onNextLevel={() => {
              const levels = ['easy', 'medium', 'hard'] as const;
              const currentIndex = levels.indexOf(difficulty);
              if (currentIndex < levels.length - 1) {
                setDifficulty(levels[currentIndex + 1]);
                setShowResults(false);
                handleReset();
              }
            }}
            hasNextLevel={difficulty !== 'hard'}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Knapsack solver using dynamic programming
function solveKnapsack(items: KnapsackItem[], capacity: number) {
  const n = items.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (items[i - 1].weight <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  // Backtrack to find items
  const optimalItems: KnapsackItem[] = [];
  let w = capacity;
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      optimalItems.push(items[i - 1]);
      w -= items[i - 1].weight;
    }
  }
  
  return {
    maxValue: dp[n][capacity],
    optimalItems: optimalItems.reverse()
  };
}

function generateExplanation(items: KnapsackItem[], capacity: number, optimalItems: KnapsackItem[]) {
  return {
    title: "Knapsack Algorithm Explanation",
    algorithm: "Dynamic Programming",
    steps: [
      "Create a table where dp[i][w] represents the maximum value using first i items with weight limit w",
      "For each item, decide whether to include it or not based on maximum value",
      "If item weight ≤ current capacity, choose max of (include item, exclude item)",
      "Backtrack through table to find which items give optimal solution"
    ],
    complexity: "Time: O(n×W), Space: O(n×W) where n = items, W = capacity",
    tips: [
      "Items with high value-to-weight ratio are often good choices",
      "Sometimes leaving space for multiple smaller valuable items is better",
      "Dynamic programming guarantees optimal solution unlike greedy approaches"
    ]
  };
}