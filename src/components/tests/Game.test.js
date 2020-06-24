import React from 'react';
import renderer from 'react-test-renderer';
import util from 'util';
import Game from '../Game';

describe('Game', () => {
  describe('when gameboard created', () => {
    it('Test If 25 Tiles Create', () => {
      const component = renderer.create(<Game />);

      const tree = component.toJSON();
      expect(tree.children[2].children.length).toEqual(25);

      console.log(util.inspect(tree, { showHidden: false, depth: null }));
    });
  });
});

// getByTestId();
// fireEvent.click...
// toHaveText
