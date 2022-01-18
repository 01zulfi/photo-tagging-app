import React, { FC, useEffect, useRef, useState } from 'react';
import { onSnapshot, getFirestore, doc } from 'firebase/firestore';
import firebase from '../firebase/firebase';

const GameEnd: FC = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const nameInput = useRef<any>(null);

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
    if (!nameInput.current.checkValidity()) {
      setErrorMessage('name required');
    } else {
      setErrorMessage('');
      firebase.addName(name);
    }
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
        <input
          onChange={inputHandler}
          type="text"
          id="name-input"
          required
          ref={nameInput}
        />
      </label>
      <span>{errorMessage}</span>
      <button onClick={submitHandler} type="button">
        Submit Score
      </button>
    </section>
  );
};

export default GameEnd;
