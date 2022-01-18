import React, { FC } from 'react';
import styled from 'styled-components';
import tom from '../images/tom.png';
import batman from '../images/batman.png';
import neo from '../images/neo-matrix.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  margin-top: 35px;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0px 15px 30px rgb(0 0 0 / 15%);
`;

const CharactersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const CharacterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
`;

const CharacterImage = styled.img`
  flex: 1;
  margin: 5px;
  border-radius: 10px;
`;

const CharacterText = styled.p`
  color: white;
  font-family: 'Mochiy Pop P One', sans-serif;
  margin: 10px;
  font-weight: 800;
`;

const StyledHeading = styled.h2`
  @import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap');
  font-family: 'Mochiy Pop P One', sans-serif;
  color: white;
`;

const StartButton = styled.button`
  height: fit-content;
  padding: 20px;
  background-color: #03dac6;
  border: 0;
  border-radius: 10px;
  &:hover {
    background-color: #018786;
    color: white;
    cursor: pointer;
  }
`;

interface StartProps {
  handleStartClick: () => void;
}

const Start: FC<StartProps> = ({ handleStartClick }) => (
  <Wrapper>
    <StyledHeading>characters to find</StyledHeading>
    <CharactersWrapper>
      <CharacterWrapper>
        <CharacterText>Tom</CharacterText>
        <CharacterImage src={tom} alt="tom" />
      </CharacterWrapper>
      <CharacterWrapper>
        <CharacterText>Neo</CharacterText>
        <CharacterImage src={neo} alt="neo" />
      </CharacterWrapper>
      <CharacterWrapper>
        <CharacterText>Batman</CharacterText>
        <CharacterImage src={batman} alt="batman" />
      </CharacterWrapper>
    </CharactersWrapper>
    <StartButton type="button" id="start" onClick={handleStartClick}>
      <h3>Start</h3>
    </StartButton>
  </Wrapper>
);

export default Start;
