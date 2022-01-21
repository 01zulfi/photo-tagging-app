import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';

test('matches snapshot', () => {
  expect(
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navbar shouldTimerStart={false} />} />
        </Routes>
      </BrowserRouter>,
    ),
  ).toMatchSnapshot();
});

test('renders correct heading', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navbar shouldTimerStart={false} />} />
      </Routes>
    </BrowserRouter>,
  );
  expect(getByRole('heading')).toHaveTextContent(/find the characters/i);
});
