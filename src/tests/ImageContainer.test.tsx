import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageContainer from '../components/ImageContainer';

test.skip('image renders', () => {
  const { getByAltText } = render(
    <ImageContainer handleImageClick={() => {}} />,
  );
  const image = getByAltText('find-characters');

  expect(image).not.toBeNull();
  expect(image).toBeInTheDocument();
});

test.skip('calls handleImageClick upon image click', () => {
  const handleImageClick = jest.fn();
  const { getByAltText } = render(
    <ImageContainer handleImageClick={handleImageClick} />,
  );
  const image = getByAltText('find-characters');

  fireEvent.click(image);

  expect(handleImageClick).toHaveBeenCalled();
});
