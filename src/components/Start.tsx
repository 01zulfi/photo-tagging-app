import React, { FC, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Loading from './Loading';
import tom from '../images/tom.png';
import batman from '../images/batman.png';
import neo from '../images/neo-matrix.png';

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

  const imageStyles = {
    width: '50px',
    aspectRatio: '1',
  };

  return (
    <section>
      <div>
        <h2>Characters to find:</h2>
        <div>
          <img src={tom} alt="tom" style={imageStyles} />
          <p>Tom from Tom and Jerry</p>
        </div>
        <div>
          <img src={neo} alt="neo" style={imageStyles} />
          <p>Neo from The Matrix</p>
        </div>
        <div>
          <img src={batman} alt="batman" style={imageStyles} />
          <p>Batman</p>
        </div>
      </div>
      {canStart ? (
        <button type="button" id="start" onClick={handleStartClick}>
          <h2>Start</h2>
        </button>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default Start;
