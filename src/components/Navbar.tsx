import React, { FC } from 'react';
import styled from 'styled-components';
import Timer from './Timer';

interface NavbarProps {
  shouldTimerStart: boolean;
}

const StyledNavbar = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledHeading = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  font-family: 'Anton', sans-serif;
  color: white;
`;

const StyledLBButton = styled.button`
  height: fit-content;
  padding: 20px;
  background-color: #bb86fc;
  border: 0;
  border-radius: 10px;
  &:hover {
    color: white;
    background: #651fff;
    cursor: pointer;
  }
`;

const Zero = styled.p`
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  font-family: 'Anton', 'sans-serif';
  color: white;
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  width: 25%;
  text-align: center;
  margin-left: auto;
  margin-right: 5%;
`;

const Navbar: FC<NavbarProps> = ({ shouldTimerStart }) => (
  <StyledNavbar>
    <StyledHeading>find the characters</StyledHeading>
    {shouldTimerStart ? <Timer /> : <Zero>0s</Zero>}
    <StyledLBButton>Leaderboard</StyledLBButton>
  </StyledNavbar>
);
export default Navbar;
