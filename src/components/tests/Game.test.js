import React from 'react';
import { fireEvent, render } from '@testing-library/react';
// import util from 'util';
import Game from '../Game';

const startGame = (component) => {
  fireEvent.click(component.getByTestId('startBtn'));
};

describe('Game', () => {
  const game = render(<Game />);

  describe('Before Game Starts', () => {
    it('Test If All 25 Tiles Exist', () => {
      for (let i = 0; i < 5; i += 1) {
        for (let x = 0; x < 5; x += 1) {
          expect(game.getByTestId(`${i}-${x}`)).toHaveTextContent('unlit');
        }
      }
    });
  });

  describe('After Game Starts', () => {
    beforeEach(() => {
      startGame(game);
    });

    it('Test If Correct Tiles Are Lit', () => {
      for (let i = 0; i < 5; i += 1) {
        for (let x = 0; x < 5; x += 1) {
          // expect(game.getByTestId(`${i}-${x}`)).toHaveTextContent('unlit');
        }
      }
    });
  });
});

// getByTestId();
// fireEvent.click...
// toHaveText
// console.log(util.inspect(tree, { showHidden: false, depth: null }));
