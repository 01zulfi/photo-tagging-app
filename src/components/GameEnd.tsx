import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { onSnapshot, getFirestore, doc } from 'firebase/firestore';
import firebase from '../firebase/firebase';

const Section = styled.section`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  z-index: 1;
  color: white;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-top: 25px;
  box-shadow: 0px 15px 30px rgb(0 0 0 / 15%);
  align-items: center;
  padding: 20px;
  border-radius: 10px;
`;

const ScoreWrapper = styled.h3`
  @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
  padding: 15px;
  box-shadow: 0px 15px 30px rgb(0 0 0 / 15%);
  margin: 20px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  font-family: 'Alfa Slab One', sans-serif;
`;

const SubmitScore = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 15px 30px rgb(0 0 0 / 15%);
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.07);
  width: 50%;
  border-radius: 10px;
  padding: 15px;
`;

const Input = styled.input`
  background: #bbdefb;
  border-radius: 10px;
  border: 0px;
  padding: 10px;
`;

const SubmitButton = styled.button`
  height: fit-content;
  padding: 20px;
  background-color: #03dac6;
  border: 0;
  border-radius: 10px;
  &:hover {
    background-color: #018786;
    color: white;
    cursor: pointer;
  }
`;

const Heading = styled.h2`
  color: #ce93d8;
`;

const GameEnd: FC = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);

  const nameInput = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const id = await firebase.getUserId();
      const userDoc = await doc(getFirestore(), 'times', id);
      await onSnapshot(userDoc, (ref) => {
        if (ref.data()?.score) setScore(ref.data()?.score);
        if (ref.data()?.name) setIsScoreSubmitted(true);
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
    <Section>
      <Heading>Congratulations! You found all of the characters!</Heading>
      <ScoreWrapper>
        Your score:
        {'  '}
        {`${score}s`}
      </ScoreWrapper>
      {isScoreSubmitted ? (
        <h4>Your score was submitted, checkout the leaderboard!</h4>
      ) : (
        <SubmitScore>
          <h4>Submit your score</h4>
          <Input
            onChange={inputHandler}
            type="text"
            id="name-input"
            required
            ref={nameInput}
            placeholder="enter name..."
          />
          <span style={{ color: 'red' }}>{errorMessage}</span>
          <SubmitButton onClick={submitHandler} type="button">
            Submit Score
          </SubmitButton>
        </SubmitScore>
      )}
    </Section>
  );
};

export default GameEnd;
