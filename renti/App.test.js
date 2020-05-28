import * as React from 'react';
import { render } from '@testing-library/react';
import App from './App';

//Start using mocks as in this template: testing-library.com/docs/react-testing-library

test('Render renti marketplace', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Renti Marketplace/i);
  expect(linkElement).toBeInTheDocument();
});


test('Render footer', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Renti 2020/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render Search', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Rent anything/i);
  expect(linkElement).toBeInTheDocument();
});