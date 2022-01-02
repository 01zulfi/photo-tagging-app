import React, { FC, useEffect } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const GameEnd: FC = () => {
  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth).catch((error) => console.log(error));
    onAuthStateChanged(auth, (user) => console.log(user));
  }, []);

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
