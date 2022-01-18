import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 15%;
  background: white;
  padding: 20px;
  background: ${(props: any) => (props.success ? '#84FFFF' : '#EF9A9A')};
  border-radius: 10px;
  font-size: 1.1em;
`;

interface StatusProps {
  success: boolean;
  renderHandler: any;
}

const Status: FC<StatusProps> = ({ renderHandler, success }) => {
  useEffect(() => {
    setTimeout(() => renderHandler(false), 1500);
  }, []);

  return (
    <Wrapper success={success}>
      {success ? (
        <p>Great! You found the character!</p>
      ) : (
        <p>That&apos;s not it! Keep looking!</p>
      )}
    </Wrapper>
  );
};

export default Status;
