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
  const [moves, setMove] = useState(0);
  const [gameData, setGameData] = useState(initialBoard);

  const handleStart = () => {
    const newBoard = initialBoard.map((row) => (
      row.map(() => (
        Math.round(Math.random())
      ))
    ));
    setGameData(newBoard);
  };

  const handleTileClick = (row, col) => {
    console.log(`${row} ${col}`);
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
        Start Game
      </button>
    </div>
  );
}

Game.propTypes = {
};
