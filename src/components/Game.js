import React, { useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import updateBoard from './scripts/updateBoard';

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

  const handleStart = () => {
    setHasWon(false);
    const row = Math.floor(Math.random() * 5);
    const col = Math.floor(Math.random() * 5);
    setMoves(0);
    const newData = updateBoard(row, col, cloneDeep(initialBoard), true, cloneDeep(initialBoard), [[row, col, false]]);
    setBoardMemory(newData.memory);
    setGameData(newData.updatedBoard);
    setPlaying(true);
  };

  const handleTileClick = (row, col, hint = false) => {
    if (playing) {
      setGameData(updateBoard(row, col, cloneDeep(gameData)));
      setMoves(moves + 1);
      if (!hint) {
        setBoardMemory([...boardMemory, [row, col, true]]);
      }
    }
  };

  const handleHint = () => {
    if (boardMemory.length > 1) {
      const newBoardMemory = cloneDeep(boardMemory);
      setBoardMemory(newBoardMemory);
      const lastMove = newBoardMemory.pop();
      handleTileClick(lastMove[0], lastMove[1], true);
    } else {
      handleTileClick(boardMemory[0][0], boardMemory[0][1], true);
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
          >
            Need A Hint?
          </button>
        )
        : (
          <button
            type='button'
            className='gameButton'
            onClick={handleStart}
          >
            Start
          </button>
        )}
    </div>
  );
}
