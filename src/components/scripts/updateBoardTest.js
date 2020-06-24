import cloneDeep from 'lodash/cloneDeep';

const TEST_BOARD = [[0, 0], [3, 2], [2, 4], [4, 4], [1, 2], [3, 3]];

const updateBoard = (row, col, currGame, create = false, tempBoard, memory, count = 0) => {
  let updatedBoard;
  if (create) {
    updatedBoard = tempBoard;
  } else {
    updatedBoard = cloneDeep(currGame);
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
  if (create && count < 6) {
    const newRow = TEST_BOARD[count][0];
    const newCol = TEST_BOARD[count][1];
    const newMemory = [...memory, [newRow, newCol, false]];
    return updateBoard(newRow, newCol, currGame, true, updatedBoard, newMemory, count + 1);
  } if (create) {
    return {
      updatedBoard,
      memory,
    };
  }
  return updatedBoard;
};

export default updateBoard;
