import React, { FC, useState } from 'react';
import photo from '../images/egor-klyuchnyk-full-x-season-web.jpg';
import calculateCoordinates from './utils/calculate-coordinates';
import DropdownMenu from './DropdownMenu';

const PhotoContainer: FC = () => {
  const [clickPosition, setClickPosition] = useState([0, 0]);
  const style = { width: '90%', cursor: 'crosshair' };

  const handleClick = (event: any) => {
    calculateCoordinates(event);
    setClickPosition([event.pageX, event.pageY]);
  };

  return (
    <div>
      <div className="photo-container">
        <img
          onClick={handleClick}
          aria-hidden="true"
          src={photo}
          alt="find-characters"
          style={style}
        />
      </div>
      <DropdownMenu clickPosition={clickPosition} />
    </div>
  );
};

export default PhotoContainer;
