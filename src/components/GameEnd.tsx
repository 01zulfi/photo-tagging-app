import { onSnapshot, getFirestore, doc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import firebase from '../firebase/firebase';

const GameEnd: FC = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    (async () => {
      const id = await firebase.getUserId();
      const userDoc = await doc(getFirestore(), 'times', id);
      await onSnapshot(userDoc, (ref) => {
        if (ref.data()?.score) setScore(ref.data()?.score);
      });
    })();
  }, []);

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
      <h3>
        Your score:
        {score}
      </h3>
      <h4>Submit your score</h4>
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
