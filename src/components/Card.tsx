import { motion } from 'framer-motion';
import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
  return (
    <motion.div
      className="relative w-14 h-14 sm:w-20 sm:h-20 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => !disabled && onClick()}
    >
      <motion.div
        className={`absolute w-full h-full rounded-xl shadow-lg transition-all duration-500 transform ${
          card.isFlipped ? 'rotateY-180' : ''
        } ${
          card.isMatched ? 'bg-green-200' : 'bg-white'
        } flex items-center justify-center text-2xl sm:text-4xl`}
        animate={{
          rotateY: card.isFlipped ? 180 : 0,
          backgroundColor: card.isMatched ? '#86efac' : '#ffffff',
        }}
      >
        {card.isFlipped ? card.emoji : '?'}
      </motion.div>
    </motion.div>
  );
}