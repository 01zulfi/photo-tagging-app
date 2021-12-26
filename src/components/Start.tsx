import React, { FC } from 'react';

interface StartProps {
  handleStartClick: () => void;
}

const Start: FC<StartProps> = ({ handleStartClick }) => (
  <section>
    <button type="button" onClick={handleStartClick}>
      <h2>Start</h2>
    </button>
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

export default Start;
