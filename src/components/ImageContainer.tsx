import React, { FC, useState, useEffect, useRef } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Loading from './Loading';

interface ImageContainerProps {
  handleImageClick: any;
}

const ImageContainer: FC<ImageContainerProps> = ({ handleImageClick }) => {
  const [imageURL, setImageURL] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const image = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const storage = getStorage();
      const fetchURL = await getDownloadURL(
        ref(storage, 'egor-klyuchnyk-full-x-season-web.jpg'),
      );
      setImageURL(fetchURL);
    })();
  }, []);

  useEffect(() => {
    if (!imageURL) return;
    image.current.onload = () => setIsImageLoaded(true);
  }, [imageURL]);

  return (
    <div>
      <div className="image-container">
        {!isImageLoaded && <Loading />}
        {imageURL && (
          <img
            onClick={handleImageClick}
            aria-hidden="true"
            src={imageURL}
            alt="find-characters"
            style={{ width: '90%', cursor: 'crosshair' }}
            ref={image}
          />
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
