import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameHeaderProps {
  level: number;
  score: number;
  moves: number;
  timeLeft: number;
  playerName: string;
}

export function GameHeader({ level, score, moves, timeLeft, playerName }: GameHeaderProps) {
  const getBadgeColor = (level: number) => {
    if (level <= 3) return 'from-blue-400 to-purple-500';
    if (level <= 6) return 'from-green-400 to-emerald-500';
    return 'from-orange-400 to-red-500';
  };

  const getBadgeTitle = (level: number) => {
    if (level <= 3) return 'Novice';
    if (level <= 6) return 'Expert';
    return 'Master';
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-4 sm:p-6 rounded-xl bg-white bg-opacity-90 shadow-lg mb-8"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Brain Flip Challenge
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-600">Player: {playerName}</p>
                <motion.div
                  className={`hidden sm:flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${getBadgeColor(level)} text-white text-sm font-semibold`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {getBadgeTitle(level)}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:flex sm:space-x-4 md:space-x-8 gap-4 sm:gap-0 w-full sm:w-auto">
          <div className="flex flex-col items-center justify-center p-2 sm:p-0 bg-purple-50 sm:bg-transparent rounded-lg sm:rounded-none">
            <p className="text-xs sm:text-sm text-gray-600">Level</p>
            <motion.p 
              className="text-xl sm:text-2xl font-bold text-purple-600"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3, times: [0, 0.5, 1] }}
            >
              {level}
            </motion.p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 sm:p-0 bg-green-50 sm:bg-transparent rounded-lg sm:rounded-none">
            <p className="text-xs sm:text-sm text-gray-600">Score</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">{score}</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 sm:p-0 bg-blue-50 sm:bg-transparent rounded-lg sm:rounded-none">
            <p className="text-xs sm:text-sm text-gray-600">Moves</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">{moves}</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 sm:p-0 bg-orange-50 sm:bg-transparent rounded-lg sm:rounded-none">
            <p className="text-xs sm:text-sm text-gray-600">Time</p>
            <p className={`text-xl sm:text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-orange-600'}`}>
              {timeLeft}s
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}