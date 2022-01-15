import React, { FC, useState, useEffect, useRef } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Loading from './Loading';

interface ImageContainerProps {
  handleImageClick: any;
  imageOpacity: number;
}

const ImageContainer: FC<ImageContainerProps> = ({
  handleImageClick,
  imageOpacity,
}) => {
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
    const onLoadCallback = () => {
      setIsImageLoaded(true);
    };
    image.current.onload = onLoadCallback;
  }, [imageURL]);

  return (
    <div
      style={{
        opacity: imageOpacity,
        pointerEvents: imageOpacity ? 'auto' : 'none',
        height: imageOpacity ? 'fit-content' : '0px',
      }}
    >
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
