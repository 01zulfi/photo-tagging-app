import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Start from '../components/Start';

const handleStartClick = jest.fn();

test('renders three list items', () => {
  const { getAllByRole } = render(
    <Start handleStartClick={handleStartClick} />,
  );
  const listItems = getAllByRole('listitem');

  expect(listItems).toHaveLength(3);
});

test('calls handleStartClick', () => {
  const { getByRole } = render(<Start handleStartClick={handleStartClick} />);
  const startButton = getByRole('button');

  fireEvent.click(startButton);

  expect(handleStartClick).toHaveBeenCalled();
});
