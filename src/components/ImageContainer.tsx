import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from '../firebase/firebase';

const Container = styled.div`
  display: ${(props: any) => (props.opacity ? 'block' : 'none')};
  pointer-events: ${(props: any) => (props.opacity ? 'auto' : 'none')};
  width: fit-content;
`;

const Image = styled.img`
  height: ${(props: any) => (props.opacity ? 'fit-content' : ' 0px')};
  width: 100%;
  cursor: crosshair;
`;

interface ImageContainerProps {
  handleImageClick: any;
  imageOpacity: number;
}

const ImageContainer: FC<ImageContainerProps> = ({
  handleImageClick,
  imageOpacity,
}) => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    (async () => {
      const URL = await firebase.fetchImageURL();
      setImageURL(URL);
    })();
  }, []);

  return (
    <Container opacity={imageOpacity}>
      {imageURL && (
        <Image
          onClick={handleImageClick}
          aria-hidden="true"
          src={imageURL}
          alt="find-characters"
          opacity={imageOpacity}
        />
      )}
    </Container>
  );
};

export default ImageContainer;
