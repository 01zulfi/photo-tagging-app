const calculateCoordinates = (event: any) => {
  const { target } = event;

  const bounds = target.getBoundingClientRect();

  const { left } = bounds;
  const { top } = bounds;

  const { clientWidth, clientHeight, naturalWidth, naturalHeight } = target;

  const x = event.pageX - left - window.scrollX;
  const y = event.pageY - top - window.scrollY;

  const px = (x / (clientWidth * naturalWidth)) * 1000;
  const py = (y / (clientHeight * naturalHeight)) * 1000;

  console.log({
    px,
    py,
    x,
    y,
    left,
    top,
    clientWidth,
    clientHeight,
    naturalWidth,
    naturalHeight,
  });

  return { x: px, y: py };
};

export default calculateCoordinates;
