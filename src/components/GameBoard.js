import React, { useState } from 'react';

import PropTypes from 'prop-types';

export default function GameBoard() {
  return (
    <div>
    </div>
  );
}

GameBoard.propTypes = {
  gameData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};
