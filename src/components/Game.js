import React, { useState, useEffect } from 'react';
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

  const toggleTiles = (row, col, create = false, tempBoard = null, memory = [], count = 0) => {
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
    if (create && count < ((Math.random() * 15) + 5)) {
      const newRow = Math.floor(Math.random() * 5);
      const newCol = Math.floor(Math.random() * 5);
      const newMemory = [...memory, [newRow, newCol]];
      return toggleTiles(newRow, newCol, true, updatedBoard, newMemory, count + 1);
    } if (create) {
      setBoardMemory(memory);
    }
    return updatedBoard;
  };

  const handleStart = () => {
    setHasWon(false);
    const row = Math.floor(Math.random() * 5);
    const col = Math.floor(Math.random() * 5);
    setMoves(0);
    const newBoard = toggleTiles(row, col, true, cloneDeep(initialBoard), [[row, col]]);
    setGameData(newBoard);
    setPlaying(true);
  };

  const handleTileClick = (row, col, hint = false) => {
    if (playing) {
      setGameData(toggleTiles(row, col));
      setMoves(moves + 1);
      if (!hint) {
        setBoardMemory([...boardMemory, [row, col]]);
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
        {`${moves} `}
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
            onClick={() => { handleHint(); }}
          >
            Need A Hint?
          </button>
        )
        : (
          <button
            type='button'
            className='gameButton'
            onClick={() => { handleStart(); }}
          >
            {playing ? 'Restart' : 'Start'}
          </button>
        )}
    </div>
  );
}
