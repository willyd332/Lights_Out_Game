import React, { useState, useEffect } from 'react';
import cD from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import updateBoard from './scripts/updateBoard';
import setupBoard from './scripts/setupBoard';

// Components
import WinModal from './WinModal';
import GameBoard from './GameBoard';

const initialBoard = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

export default function Game() {
  const [playing, setPlaying] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameData, setGameData] = useState(initialBoard);
  const [hasWon, setHasWon] = useState(false);
  const [boardMemory, setBoardMemory] = useState(initialBoard);

  const handleWin = () => {
    setHasWon(true);
  };

  const handleStart = () => {
    setHasWon(false);
    const row = Math.floor(Math.random() * 5);
    const col = Math.floor(Math.random() * 5);
    setMoves(0);
    const newData = setupBoard(row, col, cD(initialBoard), true, cD(initialBoard), boardMemory);
    setBoardMemory(newData.newMemory);
    setGameData(newData.updatedBoard);
    setPlaying(true);
  };

  const handleTileClick = (row, col) => {
    if (playing) {
      const update = updateBoard(row, col, cD(gameData), false, null, boardMemory);
      setGameData(update.updatedBoard);
      setMoves(moves + 1);
      setBoardMemory(update.newMemory);
    }
  };

  const handleHint = () => {
    for (let y = 0; y < boardMemory.length; y += 1) {
      for (let x = 0; x < boardMemory[y].length; x += 1) {
        if (boardMemory[y][x] === 1) {
          handleTileClick(y, x);
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (isEqual(gameData, initialBoard) && playing) {
      setPlaying(false);
      handleWin();
    }
  }, [gameData, playing]);

  return (
    <div>
      <h2>
        {moves}
        {' '}
        Moves
      </h2>
      <WinModal hasWon={hasWon} handleRestart={handleStart} />
      <GameBoard
        handleTileClick={handleTileClick}
        gameData={gameData}
      />
      {playing
        ? (
          <button
            type='button'
            className='gameButton'
            onClick={handleHint}
            data-testid='hintBtn'
          >
            Need A Hint?
          </button>
        )
        : (
          <button
            type='button'
            className='gameButton'
            onClick={handleStart}
            data-testid='startBtn'
          >
            Start
          </button>
        )}
    </div>
  );
}
