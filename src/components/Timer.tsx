import React, { FC, useState, useEffect } from 'react';

interface TimerProps {
  setTotalTime: any;
}

const Timer: FC<TimerProps> = ({ setTotalTime }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const time = setInterval(
      () => setSeconds((prevProps) => prevProps + 1),
      1000,
    );
    return () => {
      clearInterval(time);
      setTotalTime(seconds);
    };
  });

  return <p>{seconds}</p>;
};

export default Timer;
