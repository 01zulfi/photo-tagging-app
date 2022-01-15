import React, { FC, useState, useEffect } from 'react';
import { Timestamp, onSnapshot, doc, getFirestore } from 'firebase/firestore';
import firebase from '../firebase/firebase';

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
    }, 1300);
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

  return <p>{time}</p>;
};

export default Timer;
