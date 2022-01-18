import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';

test('matches snapshot', () => {
  expect(render(<Navbar shouldTimerStart={false} />)).toMatchSnapshot();
});

test('renders correct heading', () => {
  const { getByRole } = render(<Navbar shouldTimerStart={false} />);
  expect(getByRole('heading')).toHaveTextContent(/find the characters/i);
});
