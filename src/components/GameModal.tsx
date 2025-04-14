import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Badge3D } from './Badge3D';
import { Certificate } from './Certificate';
import { useState } from 'react';
import { Brain, Trophy, XCircle } from 'lucide-react';

interface GameModalProps {
  type: 'levelComplete' | 'gameOver' | 'gameComplete';
  level: number;
  score: number;
  playerName: string;
  onNext?: () => void;
  onRestart: () => void;
  onQuit: () => void;
}

export function GameModal({ type, level, score, playerName, onNext, onRestart, onQuit }: GameModalProps) {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const messages = {
    levelComplete: {
      title: "Level Complete!",
      message: level < 5 ? "Memory Level: Apprentice Mode!" :
               level < 8 ? "Memory Level: Goat Mode Activated!" :
               "You just unlocked Einstein's Brain!",
      badge: level < 5 ? "Apprentice" :
             level < 8 ? "Memory Goat" :
             "Brain Master",
      color: level < 5 ? "#4F46E5" :
             level < 8 ? "#059669" :
             "#7C3AED",
      icon: Brain,
    },
    gameOver: {
      title: "Time's Up!",
      message: "Looks like your brain needs a reboot! Remember, even Einstein failed sometimes. 🧠",
      icon: XCircle,
    },
    gameComplete: {
      title: "🎉 Congratulations! 🎉",
      message: "You're officially smarter than ChatGPT! (Don't tell it we said that 🤫)",
      badge: "Brain Wizard",
      color: "#DC2626",
      icon: Trophy,
    },
  };

  const handleDownloadCertificate = () => {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Certificate of Achievement';
    link.download = 'brain-flip-certificate.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const MessageIcon = messages[type].icon;

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {type === 'gameComplete' && <Confetti />}
        <motion.div
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="flex justify-center mb-6">
            <MessageIcon className="w-16 h-16" 
              color={type === 'gameOver' ? '#EF4444' : 
                     type === 'gameComplete' ? '#10B981' : '#6366F1'} 
            />
          </div>
          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {messages[type].title}
          </h2>
          <p className="text-xl text-center mb-6 text-gray-700">{messages[type].message}</p>
          {(type === 'levelComplete' || type === 'gameComplete') && (
            <div className="flex justify-center mb-6">
              <Badge3D
                text={messages[type].badge}
                color={messages[type].color}
              />
            </div>
          )}
          <p className="text-center mb-8 text-2xl font-bold text-purple-600">Score: {score}</p>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center space-x-4">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRestart}
              >
                Try Again
              </motion.button>
              {onNext && type === 'levelComplete' && (
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNext}
                >
                  Next Level
                </motion.button>
              )}
            </div>
            <div className="flex justify-center space-x-4">
              {type === 'gameComplete' && (
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCertificate(true)}
                >
                  View Certificate
                </motion.button>
              )}
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-semibold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuitConfirm(true)}
              >
                Quit Game
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {showQuitConfirm && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-sm w-full mx-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-xl font-bold text-center mb-4">Are you sure you want to quit?</h3>
            <p className="text-center mb-6 text-gray-600">Your progress will be lost!</p>
            <div className="flex justify-center space-x-4">
              <motion.button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onQuit}
              >
                Yes, Quit
              </motion.button>
              <motion.button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuitConfirm(false)}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showCertificate && (
        <Certificate
          playerName={playerName}
          score={score}
          onClose={() => setShowCertificate(false)}
          onDownload={handleDownloadCertificate}
        />
      )}
    </>
  );
}