import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

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
  const [boardMemory, setBoardMemory] = useState([]);

  const handleWin = () => {
    setHasWon(true);
  };

  const toggleTiles = (row, col, create = false, tempBoard = null, count = 0) => {
    let updatedBoard;
    if (create) {
      updatedBoard = tempBoard;
    } else {
      updatedBoard = cloneDeep(gameData);
    }
    updatedBoard[row][col] = (updatedBoard[row][col] + 1) % 2;
    if (col - 1 >= 0) {
      updatedBoard[row][col - 1] = (updatedBoard[row][col - 1] + 1) % 2;
    }
    if (col + 1 <= 4) {
      updatedBoard[row][col + 1] = (updatedBoard[row][col + 1] + 1) % 2;
    }
    if (row + 1 <= 4) {
      updatedBoard[row + 1][col] = (updatedBoard[row + 1][col] + 1) % 2;
    }
    if (row - 1 >= 0) {
      updatedBoard[row - 1][col] = (updatedBoard[row - 1][col] + 1) % 2;
    }
    if (create && count < 20) {
      const newRow = Math.floor(Math.random() * 5);
      const newCol = Math.floor(Math.random() * 5);
      setBoardMemory([...boardMemory, [newRow, newCol]]);
      return toggleTiles(newRow, newCol, true, updatedBoard, count + 1);
    }
    return updatedBoard;
  };

  const handleStart = () => {
    setHasWon(false);
    const row = Math.floor(Math.random() * 5);
    const col = Math.floor(Math.random() * 5);
    setBoardMemory([[row, col]]);
    setMoves(0);
    const newBoard = toggleTiles(row, col, true, cloneDeep(initialBoard));
    setGameData(newBoard);
    setPlaying(true);
  };

  const handleTileClick = (row, col) => {
    if (playing) {
      setGameData(toggleTiles(row, col));
      setMoves(moves + 1);
      if (isEqual(gameData, initialBoard)) {
        setPlaying(false);
        handleWin();
      }
    }
  };

  return (
    <div>
      <h2>
        {moves}
      </h2>
      <WinModal hasWon={hasWon} handleRestart={handleStart} />
      <GameBoard
        handleTileClick={handleTileClick}
        gameData={gameData}
      />
      <button type='button' onClick={() => { handleStart(); }}>
        {playing ? 'Restart' : 'Start'}
      </button>
    </div>
  );
}
