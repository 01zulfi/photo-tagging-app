import React, { FC, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Loading from './Loading';

interface StartProps {
  handleStartClick: () => void;
}

const Start: FC<StartProps> = ({ handleStartClick }) => {
  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) setCanStart(true);
    });
  }, []);

  return (
    <section>
      {canStart ? (
        <button type="button" id="start" onClick={handleStartClick}>
          <h2>Start</h2>
        </button>
      ) : (
        <Loading />
      )}
      <div>
        Characters to find:
        <ul>
          <li>Tom</li>
          <li>Neo</li>
          <li>Batman</li>
        </ul>
      </div>
    </section>
  );
};

export default Start;
