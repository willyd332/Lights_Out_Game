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
  return (
    <div>
      <h2>
        {moves}
      </h2>
      <GameBoard gameData={gameData} />
    </div>
  );
}

Game.propTypes = {
};
