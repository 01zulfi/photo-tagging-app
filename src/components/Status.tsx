import React, { FC, useEffect } from 'react';

interface StatusProps {
  success: boolean;
  renderHandler: any;
}

const Status: FC<StatusProps> = ({ renderHandler, success }) => {
  useEffect(() => {
    setTimeout(() => renderHandler(false), 1500);
  }, []);

  return (
    <div style={{ position: 'fixed', top: '15%', background: 'white' }}>
      {success ? (
        <p>Great! You found the character!</p>
      ) : (
        <p>That&apos;s not it! Keep looking!</p>
      )}
    </div>
  );
};

export default Status;
