import React from 'react';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Status from '../components/Status';

jest.useFakeTimers();

test('renders correct text when success true', () => {
  const { getByText } = render(<Status renderHandler={() => {}} success />);
  expect(getByText(/great! you found the character!/i)).toBeInTheDocument();
});

test('renders correct text when success false', () => {
  const { getByText } = render(
    <Status renderHandler={() => {}} success={false} />,
  );
  expect(getByText(/that's not it! keep looking!/i)).toBeInTheDocument();
});

test('calls render handler with false after 1500 ms', () => {
  const renderHandler = jest.fn();
  act(() => {
    render(<Status success renderHandler={renderHandler} />);
  });

  expect(renderHandler).not.toHaveBeenCalled();

  jest.runAllTimers();

  expect(renderHandler).toHaveBeenCalledTimes(1);
  expect(renderHandler).toHaveBeenCalledWith(false);
});
