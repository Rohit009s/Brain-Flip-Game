import { motion } from 'framer-motion';
import { useState } from 'react';
import { Rocket } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (playerName: string) => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim().length < 2) {
      setError('Please enter at least 2 characters');
      return;
    }
    onStart(playerName);
  };

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <motion.div 
        className="relative z-10 bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center mb-6">
          <Rocket className="w-12 h-12 text-purple-600 mr-3" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Brain Flip
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Name to Begin
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Your Name"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Challenge
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}