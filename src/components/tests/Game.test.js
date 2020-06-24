import React from 'react';
import { fireEvent, render } from '@testing-library/react';
// import util from 'util';
import Game from '../Game';

const TEST_MEM = [[0, 0], [2, 2], [4, 4], [3, 1], [1, 3]];

jest.mock('../scripts/setupBoard', () => (
  () => (
    {
      updatedBoard: [
        [1, 1, 0, 1, 0],
        [1, 0, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 0, 1],
        [0, 1, 0, 1, 1],
      ],
      memory: [[0, 0], [2, 2], [4, 4], [3, 1], [1, 3]],
    }
  )
));

const testInitTiles = (game) => {
  for (let x = 0; x < 5; x += 1) {
    for (let y = 0; y < 5; y += 1) {
      if (
        (y === 0 && (x === 0 || x === 1 || x === 3))
        || (y === 1 && (x === 0 || x === 3 || x === 4))
        || (y === 2 && x === 2)
        || (y === 3 && (x === 0 || x === 1 || x === 4))
        || (y === 4 && (x === 1 || x === 3 || x === 4))
      ) {
        expect(game.getByTestId(`${x}-${y}`)).toHaveTextContent('lit');
      } else {
        expect(game.getByTestId(`${x}-${y}`)).toHaveTextContent('unlit');
      }
    }
  }
};

describe('Game', () => {
  let game;
  beforeEach(() => {
    game = render(<Game />);
  });

  describe('Before Game Starts', () => {
    it('Test If All 25 Tiles Exist', () => {
      for (let x = 0; x < 5; x += 1) {
        for (let y = 0; x < 5; x += 1) {
          expect(game.getByTestId(`${x}-${y}`)).toHaveTextContent('unlit');
        }
      }
    });
  });

  describe('After Game Starts', () => {
    beforeEach(() => {
      fireEvent.click(game.getByTestId('startBtn'));
    });

    it('Test If Correct Tiles Are Lit', () => {
      testInitTiles(game);
    });

    it('Test If Correct Tiles Toggle On Click', () => {
      fireEvent.click(game.getByTestId(`${0}-${1}`));
      expect(game.getByTestId(`${0}-${1}`)).toHaveTextContent('lit');
      expect(game.getByTestId(`${0}-${0}`)).toHaveTextContent('unlit');
      expect(game.getByTestId(`${0}-${2}`)).toHaveTextContent('lit');
      expect(game.getByTestId(`${1}-${1}`)).toHaveTextContent('lit');
    });

    it('Test If Hint Button Works', () => {
      fireEvent.click(game.getByTestId(`${0}-${1}`));
      for (let i = 0; i < TEST_MEM.length; i += 1) {
        fireEvent.click(game.getByTestId('hintBtn'));
      }
      expect(game.getByTestId(`${0}-${0}`)).toHaveTextContent('lit');
      expect(game.getByTestId(`${0}-${1}`)).toHaveTextContent('lit');
      expect(game.getByTestId(`${1}-${0}`)).toHaveTextContent('lit');
    });

    it('Test If Game Can Be Completed', () => {
      expect(game.getByTestId('winModal')).toHaveClass('winModalHidden');
      for (let i = 0; i < TEST_MEM.length; i += 1) {
        fireEvent.click(game.getByTestId('hintBtn'));
      }
      expect(game.getByTestId('winModal')).toHaveClass('winModal');
    });

    it('Test If Game Can Be Restarted', () => {
      for (let i = 0; i < TEST_MEM.length; i += 1) {
        fireEvent.click(game.getByTestId('hintBtn'));
      }
      fireEvent.click(game.getByTestId('restartBtn'));
      testInitTiles(game);
    });
  });
});

// getByTestId();
// fireEvent.click...
// toHaveText
// console.log(util.inspect(tree, { showHidden: false, depth: null }));
