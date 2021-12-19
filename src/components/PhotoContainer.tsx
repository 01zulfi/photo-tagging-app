import React, { FC } from 'react';
import photo from '../images/egor-klyuchnyk-full-x-season-web.jpg';

const PhotoContainer:FC = () => {
  const style = { width: '90%' };

  function findPosition(oElement:any) {
    console.log('find position called');
    let oElement2 = oElement;
    let posX:number;
    let posY:number;
    if (typeof (oElement2.offsetParent) !== 'undefined') {
      for (posX = 0, posY = 0; oElement2; oElement2 = oElement2.offsetParent) {
        posX += oElement2.offsetLeft;
        posY += oElement2.offsetTop;
      }
      return [posX, posY];
    }

    return [oElement2.x, oElement2.y];
  }

  function getCoordinates(event:any) {
    console.log('get coordinates called');
    let posX = 0;
    let posY = 0;
    const imgPos = findPosition(document.querySelector('img'));
    console.log({ imgPos });
    //    if (!event) var e = window.event;
    if (event.pageX || event.pageY) {
      posX = event.pageX;
      posY = event.pageY;
    } else if (event.clientX || event.clientY) {
      posX = event.clientX + document.body.scrollLeft
          + document.documentElement.scrollLeft;
      posY = event.clientY + document.body.scrollTop
          + document.documentElement.scrollTop;
    }
    posX -= imgPos[0];
    posY -= imgPos[1];
    console.log({ posX, posY });
  }

  const getCoordinates2 = (event:any) => {
    // https://stackoverflow.com/a/288731/1497139
    const bounds = event.target.getBoundingClientRect();
    const { left } = bounds;
    const { top } = bounds;
    const x = event.pageX - left;
    const y = event.pageY - top;
    const cw = event.target.clientWidth;
    const ch = event.target.clientHeight;
    const iw = event.target.naturalWidth;
    const ih = event.target.naturalHeight;
    const px = x / (cw * iw);
    const py = y / (ch * ih);
    console.log({
      px, py, x, y, left, top, cw, ch, iw, ih,
    });
  };

  const handleClick = (event:any) => {
    getCoordinates(event);
    getCoordinates2(event);
  };

  return (
    <div className="photo-container">
      <img onClick={handleClick} aria-hidden="true" src={photo} alt="find-characters" style={style} />
    </div>
  );
};

export default PhotoContainer;
