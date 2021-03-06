import cloneDeep from 'lodash/cloneDeep';

const updateBoard = (row, col, currGame, create, tempBoard, memory, count = 0) => {
  let updatedBoard;
  if (create) {
    updatedBoard = tempBoard;
  } else {
    updatedBoard = cloneDeep(currGame);
  }
  updatedBoard[row][col] = (updatedBoard[row][col] + 1) % 2;
  const newMemory = cloneDeep(memory);
  newMemory[row][col] = (newMemory[row][col] + 1) % 2;
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
    return updateBoard(newRow, newCol, currGame, true, updatedBoard, newMemory, count + 1);
  }
  return {
    updatedBoard,
    newMemory,
  };
};

export default updateBoard;
