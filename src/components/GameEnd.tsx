import React, { FC, useState } from 'react';
import firebase from '../firebase/firebase';

const GameEnd: FC = () => {
  const [name, setName] = useState('');

  const inputHandler = (event: any) => setName(event.target.value);

  const submitHandler = () => {
    firebase.addName(name);
  };

  return (
    <section
      style={{
        width: '100%',
        height: '100%',
        background: 'white',
        zIndex: '1',
        // position: 'fixed',
        // top: '0',
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
