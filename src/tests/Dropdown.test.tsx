import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dropdown from '../components/Dropdown';

const characters = [
  { name: 'one', id: '1' },
  { name: 'two', id: '2' },
  { name: 'three', id: '3' },
];
const handleDropdownClick = jest.fn();
const dropdownPosition = { x: 0, y: 0 };

test('renders characters correctly', () => {
  const { getByRole } = render(
    <Dropdown
      dropdownPosition={dropdownPosition}
      handleDropdownClick={handleDropdownClick}
      characters={characters}
    />,
  );
  const list = getByRole('list');

  expect(list.childNodes).toHaveLength(3);
});

test('calls handleDropdownClick when listitem is clicked', () => {
  const { getByText } = render(
    <Dropdown
      dropdownPosition={dropdownPosition}
      handleDropdownClick={handleDropdownClick}
      characters={characters}
    />,
  );
  const one = getByText('one');

  fireEvent.click(one);

  expect(handleDropdownClick).toHaveBeenCalled();
});
