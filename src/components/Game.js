import React, { useState } from 'react';

import PropTypes from 'prop-types';

// Components
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

  const handleStart = () => {
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

  const handleTileClick = (row, col) => {
    if (playing) {
      const updatedBoard = gameData;

      const toggle = (dir) => {
        updatedBoard[row][col] = (updatedBoard[row][col] + 1) % 2;
        if (dir.includes('left')) {
          updatedBoard[row][col - 1] = (updatedBoard[row][col - 1] + 1) % 2;
        }
        if (dir.includes('right')) {
          updatedBoard[row][col + 1] = (updatedBoard[row][col + 1] + 1) % 2;
        }
        if (dir.includes('below')) {
          updatedBoard[row + 1][col] = (updatedBoard[row + 1][col] + 1) % 2;
        }
        if (dir.includes('above')) {
          updatedBoard[row - 1][col] = (updatedBoard[row - 1][col] + 1) % 2;
        }
      };

      if (row === 0) {
        if (col === 0) {
          toggle(['right', 'below']);
        } else if (col === 4) {
          toggle(['left', 'below']);
        } else {
          toggle(['left', 'right', 'below']);
        }
      } else if (row === 4) {
        if (col === 0) {
          toggle(['right', 'above']);
        } else if (col === 4) {
          toggle(['left', 'above']);
        } else {
          toggle(['left', 'right', 'above']);
        }
      } else if (col === 0) {
        toggle(['right', 'above', 'below']);
      } else if (col === 4) {
        toggle(['left', 'above', 'below']);
      } else {
        toggle(['left', 'right', 'above', 'below']);
      }
      setGameData(updatedBoard);
      setMoves(moves + 1);
      if (gameData === initialBoard) {
        handleWin();
      }
    }
  };

  return (
    <div>
      <h2>
        {moves}
      </h2>
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

Game.propTypes = {
};
