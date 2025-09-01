'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Zap } from 'lucide-react';

interface GamePortalProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gameType: 'knapsack' | 'tsp';
  theme: 'cave' | 'map';
  delay: number;
}

export default function GamePortal({ 
  title, 
  subtitle, 
  description, 
  icon, 
  gameType, 
  theme, 
  delay 
}: GamePortalProps) {
  const router = useRouter();
  
  const handleEnterGame = () => {
    router.push(`/game/${gameType}`);
  };

  const themeGradients = {
    cave: 'from-orange-500/20 via-red-500/20 to-yellow-500/20',
    map: 'from-blue-500/20 via-purple-500/20 to-green-500/20'
  };

  const themeAccents = {
    cave: 'text-orange-400',
    map: 'text-blue-400'
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group cursor-pointer"
    >
      <Card className={`h-full bg-gradient-to-br ${themeGradients[theme]} border-white/20 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-2xl hover:shadow-white/10`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className={`p-3 rounded-xl bg-white/10 ${themeAccents[theme]} group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: 5 }}
            >
              {icon}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.2 }}
              className="flex items-center gap-1 text-yellow-400"
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Interactive</span>
            </motion.div>
          </div>
          
          <CardTitle className="text-2xl text-white group-hover:text-gray-100 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className={`${themeAccents[theme]} font-medium`}>
            {subtitle}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-300 mb-6 leading-relaxed">
            {description}
          </p>
          
          {/* Difficulty Indicators */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-400">Difficulty:</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((level) => (
                <div 
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= 2 ? themeAccents[theme].replace('text-', 'bg-') : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleEnterGame}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg"
          >
            Enter Adventure
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}