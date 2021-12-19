import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';

test('matches snapshot', () => {
  expect(render(<Navbar />)).toMatchSnapshot();
});

test('renders correct heading', () => {
  const { getByRole } = render(<Navbar />);
  expect(getByRole('heading')).toHaveTextContent(/photo tagging app/i);
});
