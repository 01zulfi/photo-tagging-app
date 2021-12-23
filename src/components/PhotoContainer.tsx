import React, { FC } from 'react';
import photo from '../images/egor-klyuchnyk-full-x-season-web.jpg';
import calculateCoordinates from './utils/calculate-coordinates';

const PhotoContainer: FC = () => {
  const style = { width: '90%' };

  const handleClick = (event: any) => {
    const { x, y } = calculateCoordinates(event);
    console.log({ x, y });
  };

  return (
    <div className="photo-container">
      <img
        onClick={handleClick}
        aria-hidden="true"
        src={photo}
        alt="find-characters"
        style={style}
      />
    </div>
  );
};

export default PhotoContainer;
