export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  level: number;
  score: number;
  moves: number;
  timeLeft: number;
  cards: Card[];
  gameStatus: 'welcome' | 'playing' | 'paused' | 'won' | 'lost' | 'levelComplete';
}

export interface PowerUp {
  name: string;
  description: string;
  icon: string;
  isAvailable: boolean;
  action: () => void;
}