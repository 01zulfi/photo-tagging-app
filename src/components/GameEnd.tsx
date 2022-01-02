import React, { FC, useEffect } from 'react';

const GameEnd: FC = () => {
  useEffect(() => {}, []);

  return (
    <section
      style={{
        width: '100%',
        height: '100%',
        background: 'white',
        zIndex: '1',
        position: 'fixed',
        top: '0',
      }}
    >
      <h2>Congratulations! You found all of the characters!</h2>
    </section>
  );
};

export default GameEnd;
