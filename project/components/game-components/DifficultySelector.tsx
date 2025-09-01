'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Play, Zap, Target, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DifficultySelectorProps {
  title: string;
  subtitle: string;
  difficulty: 'easy' | 'medium' | 'hard';
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onStartGame: () => void;
  onBack: () => void;
  theme: 'cave' | 'map';
}

export default function DifficultySelector({
  title,
  subtitle,
  difficulty,
  onDifficultyChange,
  onStartGame,
  onBack,
  theme
}: DifficultySelectorProps) {
  const themeColors = {
    cave: {
      primary: 'text-orange-400',
      secondary: 'text-red-400',
      gradient: 'from-orange-500/20 via-red-500/20 to-yellow-500/20'
    },
    map: {
      primary: 'text-blue-400',
      secondary: 'text-purple-400',
      gradient: 'from-blue-500/20 via-purple-500/20 to-teal-500/20'
    }
  };

  const currentTheme = themeColors[theme];

  const difficulties = [
    {
      key: 'easy' as const,
      name: 'Easy',
      description: theme === 'cave' ? '4 treasures, simple choices' : '4 cities, clear paths',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10 border-green-500/30',
      hoverColor: 'hover:bg-green-500/20'
    },
    {
      key: 'medium' as const,
      name: 'Medium',
      description: theme === 'cave' ? '6 treasures, strategic thinking' : '5 cities, planning required',
      icon: <Target className="w-6 h-6" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10 border-yellow-500/30',
      hoverColor: 'hover:bg-yellow-500/20'
    },
    {
      key: 'hard' as const,
      name: 'Hard',
      description: theme === 'cave' ? '8 treasures, optimal solutions' : '6 cities, complex optimization',
      icon: <Flame className="w-6 h-6" />,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10 border-red-500/30',
      hoverColor: 'hover:bg-red-500/20'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-6 left-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
            <p className={`text-xl ${currentTheme.primary} mb-6`}>{subtitle}</p>
            <p className="text-gray-300 max-w-md mx-auto">
              Choose your difficulty level and begin your algorithmic adventure!
            </p>
          </motion.div>
        </div>

        {/* Difficulty Selection */}
        <Card className={`bg-gradient-to-br ${currentTheme.gradient} border-white/20 backdrop-blur-sm mb-8`}>
          <CardHeader>
            <CardTitle className="text-white text-center">Select Difficulty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {difficulties.map((diff, index) => (
              <motion.div
                key={diff.key}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => onDifficultyChange(diff.key)}
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-300 text-left
                    ${difficulty === diff.key 
                      ? `${diff.bgColor} border-opacity-100 ring-2 ring-white/20` 
                      : `bg-white/5 border-white/10 ${diff.hoverColor}`
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${diff.color}`}>
                        {diff.icon}
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${diff.color}`}>{diff.name}</h3>
                        <p className="text-gray-300 text-sm">{diff.description}</p>
                      </div>
                    </div>
                    {difficulty === diff.key && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                      >
                        <span className="text-black text-sm font-bold">✓</span>
                      </motion.div>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Start Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={onStartGame}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Adventure
          </Button>
        </motion.div>

        {/* Level Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>
            {theme === 'cave' 
              ? `This level contains ${difficulty === 'easy' ? '4' : difficulty === 'medium' ? '6' : '8'} treasures to choose from.`
              : `This level contains ${difficulty === 'easy' ? '4' : difficulty === 'medium' ? '5' : '6'} cities to visit.`
            }
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}