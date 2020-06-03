import React from 'react';
import renderer from 'react-test-renderer';

import Product from './screens/Product'
import App from './App';

describe('<Product />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Product />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
