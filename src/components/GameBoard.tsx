import { motion } from 'framer-motion';
import { Card } from './Card';
import type { Card as CardType } from '../types';
import { LEVEL_CONFIG, LEVEL_COLORS } from '../constants';

interface GameBoardProps {
  cards: CardType[];
  level: number;
  onCardClick: (card: CardType) => void;
  disabled: boolean;
}

export function GameBoard({ cards, level, onCardClick, disabled }: GameBoardProps) {
  const { grid } = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG];
  
  return (
    <motion.div
      className={`grid gap-2 sm:gap-4 p-4 sm:p-8 rounded-2xl bg-gradient-to-r ${LEVEL_COLORS[level as keyof typeof LEVEL_COLORS]}`}
      style={{
        gridTemplateColumns: `repeat(${grid[1]}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${grid[0]}, minmax(0, 1fr))`,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => onCardClick(card)}
          disabled={disabled}
        />
      ))}
    </motion.div>
  );
}