import React, { FC } from 'react';
import styled from 'styled-components';
import Timer from './Timer';

interface NavbarProps {
  shouldTimerStart: boolean;
}

const StyledNavbar = styled.header`
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #384058;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledHeading = styled.h1`
  color: #d3deff;
  font-weight: bolder;
`;

const StyledLBButton = styled.button`
  height: fit-content;
  padding: 20px;
  background-color: #ffb84d;
  border: 0;
  border-radius: 10px;
`;

const Zero = styled.p`
  font-family: 'Anton', 'sans-serif';
  color: white;
  font-size: 2rem;
  background: black;
  width: 25%;
  text-align: center;
`;

const Navbar: FC<NavbarProps> = ({ shouldTimerStart }) => (
  <StyledNavbar>
    <StyledHeading>find the characters</StyledHeading>
    {shouldTimerStart ? <Timer /> : <Zero>0</Zero>}
    <StyledLBButton>Leaderboard</StyledLBButton>
  </StyledNavbar>
);
export default Navbar;
