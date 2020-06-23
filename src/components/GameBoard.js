import React from 'react';

import PropTypes from 'prop-types';

export default function GameBoard({ gameData, handleTileClick }) {
  const boardData = gameData.map((row, rowIndex) => (
    row.map((tile, colIndex) => (
      <button
        className={`tile ${tile ? 'litTile' : 'unlitTile'}`}
        onClick={() => { handleTileClick(rowIndex, colIndex); }}
        type='button'
      >
        {`${tile ? 'litTile,' : 'unlitTile,'} Row: ${rowIndex} Col: ${colIndex}`}
      </button>
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
