import React, { FC } from 'react';

interface StatusProps {
  success: boolean;
}

const Status: FC<StatusProps> = ({ success }) => (
  <div style={{ position: 'fixed', top: '15%' }}>
    {success ? (
      <p>Great! You found the character!</p>
    ) : (
      <p>That&apos;s not it! Keep looking!</p>
    )}
  </div>
);

export default Status;
