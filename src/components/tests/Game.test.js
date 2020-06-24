import React from 'react';
import { fireEvent, render } from '@testing-library/react';
// import util from 'util';
import Game from '../Game';

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

/*
what to test? priorities, probably:
that the correct tiles are toggled initially
that the correct tiles are toggled when you click a tile
that the game can be completed
that the game can be restarted
that the autosolver, when clicked enough times, will win the game
*/

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
    });
  });
});

// getByTestId();
// fireEvent.click...
// toHaveText
// console.log(util.inspect(tree, { showHidden: false, depth: null }));
