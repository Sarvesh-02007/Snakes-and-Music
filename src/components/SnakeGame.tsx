import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Direction, Point, GameState } from '../types';
import { GRID_SIZE, INITIAL_SPEED, SPEED_INCREMENT, MIN_SPEED } from '../constants';

const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const INITIAL_FOOD: Point = { x: 5, y: 5 };

export default function SnakeGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: 'UP',
    score: 0,
    isGameOver: false,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((snake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      snake: INITIAL_SNAKE,
      food: INITIAL_FOOD,
      direction: 'UP',
      score: 0,
      isGameOver: false,
    }));
    setSpeed(INITIAL_SPEED);
    setIsPlaying(true);
  };

  const moveSnake = useCallback(() => {
    setGameState((prev) => {
      if (prev.isGameOver) return prev;

      const head = { ...prev.snake[0] };

      switch (prev.direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      if (
        head.x < 0 || head.x >= GRID_SIZE ||
        head.y < 0 || head.y >= GRID_SIZE ||
        prev.snake.some((s) => s.x === head.x && s.y === head.y)
      ) {
        const newHighScore = Math.max(prev.score, prev.highScore);
        localStorage.setItem('snakeHighScore', newHighScore.toString());
        return { ...prev, isGameOver: true, highScore: newHighScore };
      }

      const newSnake = [head, ...prev.snake];

      if (head.x === prev.food.x && head.y === prev.food.y) {
        setSpeed((s) => Math.max(MIN_SPEED, s - SPEED_INCREMENT));
        return {
          ...prev,
          snake: newSnake,
          food: generateFood(newSnake),
          score: prev.score + 10,
        };
      }

      newSnake.pop();
      return { ...prev, snake: newSnake };
    });
  }, [generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setGameState((prev) => {
        if (key === 'arrowup' || key === 'w') {
          if (prev.direction !== 'DOWN') return { ...prev, direction: 'UP' };
        }
        if (key === 'arrowdown' || key === 's') {
          if (prev.direction !== 'UP') return { ...prev, direction: 'DOWN' };
        }
        if (key === 'arrowleft' || key === 'a') {
          if (prev.direction !== 'RIGHT') return { ...prev, direction: 'LEFT' };
        }
        if (key === 'arrowright' || key === 'd') {
          if (prev.direction !== 'LEFT') return { ...prev, direction: 'RIGHT' };
        }
        return prev;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (isPlaying && !gameState.isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameState.isGameOver, moveSnake, speed]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg z-10 relative">
      {/* Header Stats */}
      <div className="w-full flex justify-between border-glitch p-4 bg-black text-2xl tear">
        <div>
          <span className="text-[#ff00ff]">SCORE:</span>
          <span className="text-[#00ffff] ml-2 font-bold">{gameState.score.toString().padStart(4, '0')}</span>
        </div>
        <div>
          <span className="text-[#ff00ff]">HI_MEM:</span>
          <span className="text-[#00ffff] ml-2">{gameState.highScore.toString().padStart(4, '0')}</span>
        </div>
      </div>

      <div className="relative border-glitch bg-black p-2">
        <div 
          style={{
            width: 'min(85vw, 400px)',
            height: 'min(85vw, 400px)',
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            gap: '1px',
            backgroundColor: '#0a0a0a'
          }}
        >
          {gameState.snake.map((segment, i) => (
            <div
              key={`${i}-${segment.x}-${segment.y}`}
              className={i === 0 ? 'bg-white z-10' : 'bg-[#00ffff]'}
              style={{
                gridColumnStart: segment.x + 1,
                gridRowStart: segment.y + 1,
              }}
            />
          ))}

          <div
            className="bg-[#ff00ff] animate-pulse z-0"
            style={{
              gridColumnStart: gameState.food.x + 1,
              gridRowStart: gameState.food.y + 1,
            }}
          />

          <AnimatePresence>
            {gameState.isGameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-6 text-center border-4 border-[#ff00ff]"
              >
                <h2 className="text-3xl font-display text-[#ff00ff] mb-4 uppercase glitch" data-text="FATAL_ERR">FATAL_ERR</h2>
                <p className="text-[#00ffff] mb-8 text-2xl font-bold">SEGMENTATION FAULT 0x00</p>
                <button
                  onClick={resetGame}
                  className="text-2xl border-4 border-[#00ffff] bg-black text-[#00ffff] hover:bg-[#00ffff] hover:text-black px-6 py-2 uppercase font-bold"
                >
                  [ REBOOT_SYS ]
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!isPlaying && !gameState.isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/80 backdrop-blur-[2px]">
              <button
                onClick={() => setIsPlaying(true)}
                className="flex flex-col items-center text-[#00ffff] hover:text-[#ff00ff] group border-4 border-[#00ffff] hover:border-[#ff00ff] p-6 bg-black"
              >
                <span className="font-display text-base uppercase animate-pulse mb-4 text-[#ff00ff]">INIT MAIN()</span>
                <span className="text-2xl font-bold">[ START_SEQUENCE ]</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="text-xl flex items-center gap-4 text-[#ff00ff] font-bold bg-black px-4 py-2 border-2 border-[#ff00ff]">
          <span>USE [W][A][S][D] TO NAVIGATE</span>
        </div>
      </div>
    </div>
  );
}
