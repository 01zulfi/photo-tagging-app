const isNumInRange = (
  num: number,
  { min, max }: { min: number; max: number },
): boolean => num >= min && num <= max;

const and = (...bools: boolean[]): boolean => bools.every((bool) => bool);

const areCoordinatesInRange = (
  { x, y }: { x: number; y: number },
  {
    xMin,
    xMax,
    yMin,
    yMax,
  }: { xMin: number; xMax: number; yMin: number; yMax: number },
) =>
  and(
    isNumInRange(x, { min: xMin, max: xMax }),
    isNumInRange(y, { min: yMin, max: yMax }),
  );

export default areCoordinatesInRange;
