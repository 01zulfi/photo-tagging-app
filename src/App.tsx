import React, { FC, useEffect, useState } from 'react';
import firebase from './firebase/firebase';
import Dropdown from './components/Dropdown';
import ImageContainer from './components/ImageContainer';
import Start from './components/Start';
import Navbar from './components/Navbar';
import calculateCoordinates from './utils/calculate-coordinates';
import characters from './utils/characters';
import areCoordinatesInRange from './utils/are-coordinates-in-range';
import Status from './components/Status';
import GameEnd from './components/GameEnd';

interface Coordinates {
  x: number;
  y: number;
}

const App: FC = () => {
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [shouldDropdownRender, setShouldDropdownRender] = useState(false);
  const [charactersArray, setCharactersArray] = useState(characters);
  const [dummy, setDummy] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const [clickCoordinates, setClickCoordinates] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const [currentCharacter, setCurrentCharacter] = useState<{
    name: string;
    id: string;
  }>({ name: ' ', id: '' });
  const [success, setSuccess] = useState(false);
  const [shouldStatusRender, setShouldStatusRender] = useState(false);
  const [shouldTimerStart, setShouldTimerStart] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  const handleStartClick = (): void => setIsStartClicked(true);

  const handleImageClick = (
    event: React.MouseEvent<HTMLImageElement>,
  ): void => {
    setClickCoordinates(calculateCoordinates(event));
    setShouldDropdownRender(true);
    setDropdownPosition({ x: event.pageX, y: event.pageY });
  };

  const handleDropdownClick = (
    event: React.MouseEvent<HTMLLIElement>,
  ): void => {
    const id = event.currentTarget.getAttribute('data-id');
    const targetCharacter = characters.find((character) => character.id === id);
    if (targetCharacter) setCurrentCharacter(targetCharacter);
    setShouldDropdownRender(false);
    setDummy((val) => !val);
  };

  useEffect(() => {
    (async () => {
      const data = await firebase.getCharacterData(currentCharacter.name);
      if (data) {
        const { xMin, xMax, yMin, yMax } = data;
        const flag = areCoordinatesInRange(clickCoordinates, {
          xMin,
          xMax,
          yMin,
          yMax,
        });
        if (flag) {
          const newCharactersArray = charactersArray.filter(
            (character) => character.name !== currentCharacter.name,
          );
          setCharactersArray(newCharactersArray);
        }
        setSuccess(flag);
        setShouldStatusRender(true);
      }
    })();
  }, [dummy]);

  useEffect(() => {
    if (charactersArray.length !== 0) return;
    setIsGameEnded(true);
    firebase.addEndTime();
  }, [charactersArray]);

  const startTimer = () => setShouldTimerStart(true);

  return (
    <div className="App">
      <Navbar shouldTimerStart={shouldTimerStart} />

      {isStartClicked ? (
        <ImageContainer
          handleImageClick={handleImageClick}
          startTimer={startTimer}
        />
      ) : (
        <Start handleStartClick={handleStartClick} />
      )}

      {shouldDropdownRender && (
        <Dropdown
          characters={charactersArray}
          dropdownPosition={dropdownPosition}
          handleDropdownClick={handleDropdownClick}
        />
      )}

      {shouldStatusRender && (
        <Status renderHandler={setShouldStatusRender} success={success} />
      )}

      {isGameEnded && <GameEnd />}
    </div>
  );
};

export default App;
