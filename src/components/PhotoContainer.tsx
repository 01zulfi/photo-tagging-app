import React, { FC, useState, useRef, useEffect } from 'react';
import photo from '../images/egor-klyuchnyk-full-x-season-web.jpg';
import calculateCoordinates from './utils/calculate-coordinates';

const PhotoContainer: FC = () => {
  const [targetBoxPosition, setTargetBoxPosition] = useState({ x: 0, y: 0 });
  const [targetBoxDisplay, setTargetBoxDisplay] = useState('none');
  const div = useRef<any>(null);
  const style = { width: '90%' };

  const handleClick = (event: any) => {
    const { x, y } = calculateCoordinates(event);
    console.log({ x, y });
  };

  const handleHover = (event: any) => {
    const x = event.pageX - div.current.clientWidth / 2;
    const y = event.pageY - div.current.clientHeight / 2;
    console.log({ x, y });
    setTargetBoxPosition({ x, y });
  };

  const handleMouseEnter = () => setTargetBoxDisplay('block');

  useEffect(() => {
    window.addEventListener('scroll', (event) => {
      if (targetBoxDisplay === 'block') {
        handleHover(event);
      }
    });
  }, []);

  return (
    <div className="photo-container">
      <img
        onClick={handleClick}
        onMouseMove={handleHover}
        onMouseEnter={handleMouseEnter}
        aria-hidden="true"
        src={photo}
        alt="find-characters"
        style={style}
      />
      <div
        ref={div}
        style={{
          width: '50px',
          height: '50px',
          background: 'white',
          display: targetBoxDisplay,
          position: 'absolute',
          left: targetBoxPosition.x,
          top: targetBoxPosition.y,
          pointerEvents: 'none',
          opacity: '0.4',
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

export default PhotoContainer;
