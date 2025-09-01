'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sword, Map, BookOpen, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GamePortal from '@/components/GamePortal';
import HowToPlay from '@/components/HowToPlay';

export default function Home() {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-70" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-50" />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Algorithm Quest
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Master algorithms through interactive puzzle adventures
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setShowTutorial(true)}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              How to Play
            </Button>
          </div>
        </motion.div>

        {/* Game Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <GamePortal
            title="Goblin Adventure"
            subtitle="Knapsack Puzzle"
            description="Help the goblin collect the most valuable treasure while managing bag capacity"
            icon={<Sword className="w-8 h-8" />}
            gameType="knapsack"
            theme="cave"
            delay={0.2}
          />
          
          <GamePortal
            title="Traveller's Quest"
            subtitle="TSP Puzzle" 
            description="Plan the shortest route through magical cities to complete your journey"
            icon={<Map className="w-8 h-8" />}
            gameType="tsp"
            theme="map"
            delay={0.4}
          />
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Your Progress
              </CardTitle>
              <CardDescription className="text-gray-300">
                Track your algorithm mastery journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-2xl font-bold text-green-400 mb-1">0</div>
                  <div className="text-sm text-gray-400">Puzzles Completed</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
                  <div className="text-sm text-gray-400">Perfect Solutions</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-purple-400 mb-1">Beginner</div>
                  <div className="text-sm text-gray-400">Current Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <HowToPlay onClose={() => setShowTutorial(false)} />
      )}
    </div>
  );
}