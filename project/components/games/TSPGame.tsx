'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Lightbulb, Send, Trophy, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TSPCanvas from '@/components/game-components/TSPCanvas';
import GameControls from '@/components/game-components/GameControls';
import ResultsModal from '@/components/game-components/ResultsModal';
import DifficultySelector from '@/components/game-components/DifficultySelector';
import { tspLevels, TSPCity, GameStats } from '@/lib/gameData';

export default function TSPGame() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [visitedCities, setVisitedCities] = useState<TSPCity[]>([]);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);

  const currentLevel = tspLevels[difficulty];

  const calculateDistance = (city1: TSPCity, city2: TSPCity) => {
    return Math.sqrt(
      Math.pow(city1.x - city2.x, 2) + Math.pow(city1.y - city2.y, 2)
    );
  };

  const handleCitySelect = useCallback((city: TSPCity) => {
    // Check if city already visited
    if (visitedCities.some(visited => visited.id === city.id)) {
      setMistakes(prev => prev + 1);
      return;
    }

    const newPath = [...visitedCities, city];
    let totalDistance = currentDistance;
    
    // Add distance from last city to this city
    if (visitedCities.length > 0) {
      const lastCity = visitedCities[visitedCities.length - 1];
      totalDistance += calculateDistance(lastCity, city);
    }

    setVisitedCities(newPath);
    setCurrentDistance(totalDistance);
  }, [visitedCities, currentDistance]);

  const handleReset = () => {
    setVisitedCities([]);
    setCurrentDistance(0);
    setMistakes(0);
    setHintsUsed(0);
  };

  const handleHint = () => {
    setHintsUsed(prev => prev + 1);
    
    // Nearest neighbor hint
    if (visitedCities.length === 0) {
      console.log("Hint: Start with any city - they're all equally good starting points!");
      return;
    }

    const lastCity = visitedCities[visitedCities.length - 1];
    const unvisitedCities = currentLevel.cities.filter(
      city => !visitedCities.some(visited => visited.id === city.id)
    );

    if (unvisitedCities.length === 0) return;

    const nearestCity = unvisitedCities.reduce((nearest, city) => {
      const distanceToNearest = calculateDistance(lastCity, nearest);
      const distanceToCity = calculateDistance(lastCity, city);
      return distanceToCity < distanceToNearest ? city : nearest;
    });

    console.log(`Hint: The nearest unvisited city is ${nearestCity.name}`);
  };

  const handleSubmit = () => {
    // Complete the tour by returning to start
    let finalDistance = currentDistance;
    if (visitedCities.length > 1) {
      finalDistance += calculateDistance(
        visitedCities[visitedCities.length - 1],
        visitedCities[0]
      );
    }

    // Calculate optimal solution using nearest neighbor (approximation for demo)
    const { minDistance, optimalPath } = solveTSP(currentLevel.cities);
    
    // Calculate score
    const efficiency = minDistance / finalDistance;
    let baseScore = Math.round(efficiency * 1000);
    const hintPenalty = hintsUsed * 50;
    const mistakePenalty = mistakes * 25;
    const finalScore = Math.max(0, baseScore - hintPenalty - mistakePenalty);
    
    const stats: GameStats = {
      score: finalScore,
      mistakes,
      hintsUsed,
      efficiency: efficiency * 100,
      userSolution: visitedCities,
      optimalSolution: optimalPath,
      userValue: finalDistance,
      optimalValue: minDistance,
      explanation: generateTSPExplanation(currentLevel.cities, optimalPath)
    };
    
    setGameStats(stats);
    setShowResults(true);
  };

  const startGame = () => {
    setGameStarted(true);
    handleReset();
  };

  const isComplete = visitedCities.length === currentLevel.cities.length;

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
        <DifficultySelector
          title="Traveller's Quest"
          subtitle="TSP Puzzle"
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          onStartGame={startGame}
          onBack={() => router.push('/')}
          theme="map"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-16 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50" />
        <div className="absolute top-40 right-24 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-teal-400 rounded-full animate-pulse opacity-60" />
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
              <h1 className="text-2xl font-bold text-white">Traveller's Quest</h1>
              <p className="text-blue-400 capitalize">{difficulty} Mode</p>
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
            <Card className="bg-black/20 border-blue-500/20 backdrop-blur-sm h-[600px]">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Magical Realm</span>
                  <div className="text-sm text-blue-400">
                    Distance: {currentDistance.toFixed(1)} leagues
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-6">
                <TSPCanvas 
                  cities={currentLevel.cities}
                  visitedCities={visitedCities}
                  onCitySelect={handleCitySelect}
                />
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Progress */}
            <Card className="bg-black/20 border-blue-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-400">Journey Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    {visitedCities.length}/{currentLevel.cities.length}
                  </div>
                  <div className="text-sm text-gray-300">Cities Visited</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">
                    {currentDistance.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-300">Total Distance</div>
                </div>
                <div className="space-y-1">
                  {visitedCities.map((city, index) => (
                    <motion.div
                      key={city.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-gray-300 flex items-center gap-2"
                    >
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{index + 1}. {city.name}</span>
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
              canSubmit={isComplete}
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
            gameType="tsp"
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

// Simple TSP solver using nearest neighbor heuristic (for demo purposes)
function solveTSP(cities: TSPCity[]) {
  if (cities.length <= 1) return { minDistance: 0, optimalPath: cities };

  const calculateDistance = (city1: TSPCity, city2: TSPCity) => {
    return Math.sqrt(
      Math.pow(city1.x - city2.x, 2) + Math.pow(city1.y - city2.y, 2)
    );
  };

  // Nearest neighbor starting from first city
  const path = [cities[0]];
  const unvisited = cities.slice(1);
  let totalDistance = 0;

  while (unvisited.length > 0) {
    const currentCity = path[path.length - 1];
    let nearestIndex = 0;
    let nearestDistance = calculateDistance(currentCity, unvisited[0]);

    for (let i = 1; i < unvisited.length; i++) {
      const distance = calculateDistance(currentCity, unvisited[i]);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }

    path.push(unvisited[nearestIndex]);
    totalDistance += nearestDistance;
    unvisited.splice(nearestIndex, 1);
  }

  // Return to start
  totalDistance += calculateDistance(path[path.length - 1], path[0]);

  return {
    minDistance: totalDistance,
    optimalPath: path
  };
}

function generateTSPExplanation(cities: TSPCity[], optimalPath: TSPCity[]) {
  return {
    title: "Traveling Salesman Problem Explanation",
    algorithm: "Nearest Neighbor Heuristic",
    steps: [
      "Start at any city (all starting points are equivalent for this heuristic)",
      "From current city, move to the nearest unvisited city",
      "Repeat until all cities are visited",
      "Return to the starting city to complete the tour"
    ],
    complexity: "Time: O(n²), Space: O(n) where n = number of cities",
    tips: [
      "Nearest neighbor gives good results quickly but isn't always optimal",
      "For small instances, try different starting cities to compare results",
      "Exact algorithms like dynamic programming guarantee optimality but are slower",
      "Real-world TSP often uses more sophisticated heuristics and optimizations"
    ]
  };
}