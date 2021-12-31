import React, { FC, useState, useEffect } from 'react';

interface TimerProps {
  shouldTimerStart: boolean;
}

const Timer: FC<TimerProps> = ({ shouldTimerStart }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!shouldTimerStart) return () => {};
    const time = setInterval(
      () => setSeconds((prevProps) => prevProps + 1),
      1000,
    );
    return () => clearInterval(time);
  });

  return <p>{seconds}</p>;
};

export default Timer;
