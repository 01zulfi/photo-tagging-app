import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Timestamp, onSnapshot, doc, getFirestore } from 'firebase/firestore';
import firebase from '../firebase/firebase';

const StyledTimer = styled.p`
  font-family: 'Anton', 'sans-serif';
  color: white;
  font-size: 2rem;
  background: black;
  width: 25%;
  text-align: center;
  margin-left: auto;
  margin-right: 5%;
`;

const Timer: FC = () => {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    (async () => {
      const start = await firebase.getStartTime();
      setStartTime(start);
    })();
  }, []);

  useEffect(() => {
    if (!startTime) return () => {};
    const interval = setInterval(() => {
      setTime(Timestamp.now().seconds - startTime);
    }, 1000);
    let unsub: any;
    (async () => {
      const id = firebase.getUserId();
      const uDoc = await doc(getFirestore(), 'times', id);
      unsub = await onSnapshot(uDoc, (ref) => {
        if (ref.data()?.end) clearInterval(interval);
      });
    })();

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, [startTime]);

  return <StyledTimer>{time}</StyledTimer>;
};

export default Timer;
