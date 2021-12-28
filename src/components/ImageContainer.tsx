import React, { FC, useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

interface ImageContainerProps {
  handleImageClick: any;
}

const ImageContainer: FC<ImageContainerProps> = ({ handleImageClick }) => {
  const [imageURL, setImageURL] = useState('');
  const style = { width: '90%', cursor: 'crosshair' };

  useEffect(() => {
    (async () => {
      const storage = getStorage();
      const fetchURL = await getDownloadURL(
        ref(storage, 'egor-klyuchnyk-full-x-season-web.jpg'),
      );
      setImageURL(fetchURL);
    })();
  }, []);

  return (
    <div>
      <div className="image-container">
        {imageURL ? (
          <img
            onClick={handleImageClick}
            aria-hidden="true"
            src={imageURL}
            alt="find-characters"
            style={style}
          />
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
