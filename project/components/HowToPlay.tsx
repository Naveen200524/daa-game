'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Sword, Map, Target, Trophy, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HowToPlayProps {
  onClose: () => void;
}

export default function HowToPlay({ onClose }: HowToPlayProps) {
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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">How to Play</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-8">
            {/* Overview */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-3">Welcome to Algorithm Quest!</h3>
              <p className="text-gray-300 leading-relaxed">
                Learn algorithms by solving interactive puzzles. Make decisions, learn from mistakes, 
                and discover optimal solutions through hands-on gameplay.
              </p>
            </div>

            {/* Game Instructions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Goblin Adventure */}
              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Sword className="w-5 h-5" />
                    Goblin Adventure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
                    <p>Choose treasures to maximize value within bag capacity</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
                    <p>Drag items to your bag or click to select</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
                    <p>Watch capacity warnings but feel free to experiment</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
                    <p>Submit when ready to see optimal solution</p>
                  </div>
                </CardContent>
              </Card>

              {/* Traveller's Quest */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Map className="w-5 h-5" />
                    Traveller's Quest
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                    <p>Plan shortest route visiting all cities once</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                    <p>Click cities in order to build your path</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                    <p>See distance updates in real-time</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                    <p>Complete tour to compare with optimal route</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Scoring System */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Trophy className="w-5 h-5" />
                  Scoring & Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Scoring</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      Perfect solution: 1000 points
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      Good solution: 500-800 points
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                      Partial solution: 200-500 points
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Learning</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      Hints available (small penalty)
                    </li>
                    <li className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      Mistakes help you learn
                    </li>
                    <li className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      Algorithm explanations after
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Difficulty Levels */}
            <Card className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Difficulty Levels</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-4 rounded-lg bg-green-500/10">
                  <h4 className="font-semibold text-green-400 mb-2">Easy</h4>
                  <p className="text-gray-300">3-4 items/cities<br />Clear optimal solutions</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-yellow-500/10">
                  <h4 className="font-semibold text-yellow-400 mb-2">Medium</h4>
                  <p className="text-gray-300">5-6 items/cities<br />Multiple good solutions</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-500/10">
                  <h4 className="font-semibold text-red-400 mb-2">Hard</h4>
                  <p className="text-gray-300">7-8 items/cities<br />Complex optimization</p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={onClose}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
              >
                Start Your Quest!
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}