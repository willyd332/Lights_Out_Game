import React, { useState } from 'react';

import PropTypes from 'prop-types';

export default function GameBoard({ gameData, handleTileClick }) {
  const boardData = gameData.map((row, rowIndex) => (
    row.map((tile, colIndex) => (
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      <button
        className={`tile ${tile ? 'litTile' : 'unlitTile'}`}
        onClick={() => { handleTileClick(rowIndex, colIndex); }}
        type='button'
      />
    ))
  ));
  return (
    <div className='gameBoard'>
      {boardData}
    </div>
  );
}

GameBoard.propTypes = {
  gameData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  handleTileClick: PropTypes.func.isRequired,
};
