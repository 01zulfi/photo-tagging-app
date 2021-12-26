import React, { FC } from 'react';
import photo from '../images/egor-klyuchnyk-full-x-season-web.jpg';

interface ImageContainerProps {
  handleImageClick: any;
}

const ImageContainer: FC<ImageContainerProps> = ({ handleImageClick }) => {
  const style = { width: '90%', cursor: 'crosshair' };

  return (
    <div>
      <div className="image-container">
        <img
          onClick={handleImageClick}
          aria-hidden="true"
          src={photo}
          alt="find-characters"
          style={style}
        />
      </div>
    </div>
  );
};

export default ImageContainer;
