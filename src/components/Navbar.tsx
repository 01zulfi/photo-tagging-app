import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import firebase from '../firebase/firebase';
import Timer from './Timer';

interface NavbarProps {
  isStartTimeAdded: boolean;
}

const Navbar: FC<NavbarProps> = ({ isStartTimeAdded }) => {
  const [shouldTimerStart, setShouldTimerStart] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    (async () => {
      if (isStartTimeAdded) {
        setShouldTimerStart(true);
        const userId = await firebase.getUserId();
        const userDoc = doc(getFirestore(), 'times', userId);

        onSnapshot(userDoc, (user) => {
          console.log(user.data());
          if (user.data()?.end) {
            console.log('end timer');
            setShouldTimerStart(false);
          }
        });
      }
    })();
  }, [isStartTimeAdded]);

  return (
    <div className="navbar">
      <h1>Photo Tagging App</h1>
      {shouldTimerStart ? (
        <Timer setTotalTime={setTotalTime} />
      ) : (
        <p>{totalTime}</p>
      )}
      <button className="leaderboard" type="button">
        Leaderboard
      </button>
    </div>
  );
};
export default Navbar;
