import React from 'react';

import PropTypes from 'prop-types';

export default function WinModal({ hasWon, handleRestart }) {
  return (
    <div
      className={hasWon ? 'winModal' : 'winModalHidden'}
      data-testid='winModal'
    >
      <h1>You Win!</h1>
      <button
        type='button'
        onClick={handleRestart}
        data-testid='restartBtn'
      >
        Restart
      </button>
    </div>
  );
}

WinModal.propTypes = {
  hasWon: PropTypes.bool.isRequired,
  handleRestart: PropTypes.func.isRequired,
};
