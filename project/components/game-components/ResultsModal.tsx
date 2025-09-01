'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Target, Lightbulb, RotateCcw, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameStats } from '@/lib/gameData';

interface ResultsModalProps {
  gameType: 'knapsack' | 'tsp';
  stats: GameStats;
  onClose: () => void;
  onPlayAgain: () => void;
  onNextLevel: () => void;
  hasNextLevel: boolean;
}

export default function ResultsModal({
  gameType,
  stats,
  onClose,
  onPlayAgain,
  onNextLevel,
  hasNextLevel
}: ResultsModalProps) {
  const getScoreRating = (score: number) => {
    if (score >= 900) return { rating: 'Perfect!', color: 'text-yellow-400', stars: 3 };
    if (score >= 700) return { rating: 'Excellent!', color: 'text-green-400', stars: 3 };
    if (score >= 500) return { rating: 'Good!', color: 'text-blue-400', stars: 2 };
    if (score >= 300) return { rating: 'Fair', color: 'text-orange-400', stars: 2 };
    return { rating: 'Keep Trying!', color: 'text-red-400', stars: 1 };
  };

  const scoreRating = getScoreRating(stats.score);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">Quest Complete!</h2>
                <p className="text-gray-400">
                  {gameType === 'knapsack' ? 'Goblin Adventure' : "Traveller's Quest"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6">
            {/* Score Section */}
            <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30 mb-6">
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex justify-center mb-4"
                >
                  {[...Array(scoreRating.stars)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>
                <CardTitle className={`text-4xl font-bold ${scoreRating.color}`}>
                  {stats.score}
                </CardTitle>
                <p className={`text-xl ${scoreRating.color}`}>{scoreRating.rating}</p>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Performance Stats */}
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Your Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Efficiency</span>
                    <span className="text-green-400 font-bold">
                      {stats.efficiency.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">
                      {gameType === 'knapsack' ? 'Total Value' : 'Total Distance'}
                    </span>
                    <span className="text-blue-400 font-bold">
                      {gameType === 'knapsack' 
                        ? `${stats.userValue} gold`
                        : `${stats.userValue.toFixed(1)} leagues`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Mistakes Made</span>
                    <span className="text-red-400 font-bold">{stats.mistakes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Hints Used</span>
                    <span className="text-yellow-400 font-bold">{stats.hintsUsed}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Optimal Solution */}
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Optimal Solution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Optimal Value</span>
                    <span className="text-emerald-400 font-bold">
                      {gameType === 'knapsack' 
                        ? `${stats.optimalValue} gold`
                        : `${stats.optimalValue.toFixed(1)} leagues`
                      }
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold mb-2">Optimal Selection:</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {stats.optimalSolution.map((item, index) => (
                        <div key={index} className="text-gray-400">
                          {gameType === 'knapsack' 
                            ? `${item.name} (${item.value}g, ${item.weight}kg)`
                            : `${index + 1}. ${item.name}`
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Algorithm Explanation */}
            <Card className="bg-black/20 border-white/10 mt-6">
              <CardHeader>
                <CardTitle className="text-white">{stats.explanation.title}</CardTitle>
                <p className="text-blue-400">{stats.explanation.algorithm}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Algorithm Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                    {stats.explanation.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Complexity:</h4>
                  <p className="text-sm text-gray-300">{stats.explanation.complexity}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Pro Tips:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                    {stats.explanation.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                onClick={onPlayAgain}
                variant="outline"
                className="flex-1 bg-white/5 border-gray-600 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              
              {hasNextLevel && (
                <Button
                  onClick={onNextLevel}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Next Level
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}