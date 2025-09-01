'use client';

import { motion } from 'framer-motion';
import { RotateCcw, Lightbulb, Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameControlsProps {
  onReset: () => void;
  onHint: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  hintsUsed: number;
  mistakes: number;
}

export default function GameControls({
  onReset,
  onHint,
  onSubmit,
  canSubmit,
  hintsUsed,
  mistakes
}: GameControlsProps) {
  return (
    <Card className="bg-black/20 border-purple-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-purple-400 text-lg">Game Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-red-500/10 rounded-lg p-3">
            <div className="text-xl font-bold text-red-400">{mistakes}</div>
            <div className="text-xs text-gray-400">Mistakes</div>
          </div>
          <div className="bg-yellow-500/10 rounded-lg p-3">
            <div className="text-xl font-bold text-yellow-400">{hintsUsed}</div>
            <div className="text-xs text-gray-400">Hints Used</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full bg-white/5 border-gray-600 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Puzzle
          </Button>

          <Button
            onClick={onHint}
            variant="outline"
            className="w-full bg-yellow-500/10 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Get Hint (-50 pts)
          </Button>

          <motion.div
            whileHover={canSubmit ? { scale: 1.02 } : {}}
            whileTap={canSubmit ? { scale: 0.98 } : {}}
          >
            <Button
              onClick={onSubmit}
              disabled={!canSubmit}
              className={`w-full relative overflow-hidden ${
                canSubmit 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Solution
              
              {canSubmit && (
                <motion.div
                  animate={{ x: [-100, 400] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Submit Warning */}
        {!canSubmit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 text-sm text-amber-400 bg-amber-500/10 rounded-lg p-3"
          >
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>Complete your selection to submit your solution.</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}