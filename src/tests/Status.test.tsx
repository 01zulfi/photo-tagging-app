import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Status from '../components/Status';

test('renders correct text when success true', () => {
  const { getByText } = render(<Status success />);
  expect(getByText(/great! you found the character!/i)).toBeInTheDocument();
});

test('renders correct text when success false', () => {
  const { getByText } = render(<Status success={false} />);
  expect(getByText(/that's not it! keep looking!/i)).toBeInTheDocument();
});
