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

  const handleStart = () => {
    setHasWon(false);
    const newBoard = initialBoard.map((row) => (
      row.map(() => (
        Math.round(Math.random())
      ))
    ));
    setGameData(newBoard);
    setPlaying(true);
    setMoves(0);
  };

  const handleWin = () => {
    console.log('you win');
  };

  const toggleTiles = (row, col) => {
    const updatedBoard = cloneDeep(gameData);
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
    return updatedBoard;
  };

  const handleTileClick = (row, col) => {
    if (playing) {
      setGameData(toggleTiles(row, col));
      setMoves(moves + 1);
      if (isEqual(gameData, initialBoard)) {
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
