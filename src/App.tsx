import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { GameBoard } from './components/GameBoard';
import { GameHeader } from './components/GameHeader';
import { GameModal } from './components/GameModal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LEVEL_CONFIG, EMOJIS, TAUNTS, LEVEL_THEMES } from './constants';
import type { Card, GameState } from './types';

function App() {
  const [playerName, setPlayerName] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    moves: 0,
    timeLeft: LEVEL_CONFIG[1].time,
    cards: [],
    gameStatus: 'welcome',
  });

  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [disabled, setDisabled] = useState(false);

  // Sound effects
  const [playFlip] = useSound('/sounds/flip.mp3');
  const [playMatch] = useSound('/sounds/match.mp3');
  const [playError] = useSound('/sounds/error.mp3');
  const [playLevelUp] = useSound('/sounds/levelup.mp3');

  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      initializeLevel(gameState.level);
    }
  }, [gameState.level, gameState.gameStatus]);

  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      const timer = setInterval(() => {
        setGameState((prev) => {
          if (prev.timeLeft <= 0) {
            clearInterval(timer);
            return { ...prev, gameStatus: 'lost' };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.gameStatus]);

  const handleStartGame = (name: string) => {
    setPlayerName(name);
    setGameState((prev) => ({ ...prev, gameStatus: 'playing' }));
  };

  const initializeLevel = (level: number) => {
    const config = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG];
    const shuffledEmojis = EMOJIS.sort(() => Math.random() - 0.5).slice(0, config.pairs);
    const cards: Card[] = [...shuffledEmojis, ...shuffledEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));

    setGameState((prev) => ({
      ...prev,
      cards,
      timeLeft: config.time,
      gameStatus: 'playing',
    }));
    setFlippedCards([]);
    setDisabled(false);
  };

  const handleCardClick = (card: Card) => {
    if (flippedCards.length === 2 || card.isFlipped || card.isMatched) return;

    playFlip();

    const newCards = gameState.cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    const newFlippedCards = [...flippedCards, card];

    setGameState((prev) => ({
      ...prev,
      cards: newCards,
      moves: prev.moves + 1,
    }));
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setDisabled(true);
      setTimeout(() => checkMatch(newFlippedCards), 1000);
    }
  };

  const checkMatch = (cards: Card[]) => {
    const [first, second] = cards;
    const match = first.emoji === second.emoji;

    if (match) {
      playMatch();
      setGameState((prev) => {
        const newCards = prev.cards.map((card) =>
          card.id === first.id || card.id === second.id
            ? { ...card, isMatched: true }
            : card
        );

        const allMatched = newCards.every((card) => card.isMatched);
        const newScore = prev.score + 100;

        if (allMatched) {
          playLevelUp();
          if (prev.level === 10) {
            return { ...prev, cards: newCards, score: newScore, gameStatus: 'won' };
          }
          return { ...prev, cards: newCards, score: newScore, gameStatus: 'levelComplete' };
        }

        return { ...prev, cards: newCards, score: newScore };
      });
    } else {
      playError();
      setGameState((prev) => ({
        ...prev,
        cards: prev.cards.map((card) =>
          card.id === first.id || card.id === second.id
            ? { ...card, isFlipped: false }
            : card
        ),
      }));
    }

    setFlippedCards([]);
    setDisabled(false);
  };

  const handleNextLevel = () => {
    setGameState((prev) => ({
      ...prev,
      level: prev.level + 1,
      gameStatus: 'playing',
    }));
  };

  const handleRestart = () => {
    setGameState({
      level: 1,
      score: 0,
      moves: 0,
      timeLeft: LEVEL_CONFIG[1].time,
      cards: [],
      gameStatus: 'playing',
    });
  };

  const handleQuit = () => {
    setPlayerName('');
    setGameState({
      level: 1,
      score: 0,
      moves: 0,
      timeLeft: LEVEL_CONFIG[1].time,
      cards: [],
      gameStatus: 'welcome',
    });
  };

  if (gameState.gameStatus === 'welcome') {
    return <WelcomeScreen onStart={handleStartGame} />;
  }

  const currentTheme = LEVEL_THEMES[gameState.level as keyof typeof LEVEL_THEMES];

  return (
    <div 
      className="min-h-screen py-8 px-4 transition-all duration-1000"
      style={{
        backgroundImage: `url("${currentTheme.background}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10">
        <GameHeader
          level={gameState.level}
          score={gameState.score}
          moves={gameState.moves}
          timeLeft={gameState.timeLeft}
          playerName={playerName}
        />
        <div className="flex justify-center">
          <GameBoard
            cards={gameState.cards}
            level={gameState.level}
            onCardClick={handleCardClick}
            disabled={disabled}
          />
        </div>
        {gameState.gameStatus === 'levelComplete' && (
          <GameModal
            type="levelComplete"
            level={gameState.level}
            score={gameState.score}
            playerName={playerName}
            onNext={handleNextLevel}
            onRestart={handleRestart}
            onQuit={handleQuit}
          />
        )}
        {gameState.gameStatus === 'lost' && (
          <GameModal
            type="gameOver"
            level={gameState.level}
            score={gameState.score}
            playerName={playerName}
            onRestart={handleRestart}
            onQuit={handleQuit}
          />
        )}
        {gameState.gameStatus === 'won' && (
          <GameModal
            type="gameComplete"
            level={gameState.level}
            score={gameState.score}
            playerName={playerName}
            onRestart={handleRestart}
            onQuit={handleQuit}
          />
        )}
      </div>
    </div>
  );
}

export default App;