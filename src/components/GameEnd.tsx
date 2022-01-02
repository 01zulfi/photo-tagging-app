import React, { FC, useEffect, useState } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const GameEnd: FC = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth).catch((error) => console.log(error));
    onAuthStateChanged(auth, (user) => console.log(user));
  }, []);

  const inputHandler = (event: any) => setName(event.target.value);

  const submitHandler = () => {
    console.log(name);
  };

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
      <h3>Submit your score</h3>
      <label htmlFor="name-input">
        Enter name:
        <input onChange={inputHandler} type="text" id="name-input" />
      </label>
      <button onClick={submitHandler} type="button">
        Submit Score
      </button>
    </section>
  );
};

export default GameEnd;
