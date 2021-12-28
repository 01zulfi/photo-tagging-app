import React, { FC, useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Dropdown from './components/Dropdown';
import ImageContainer from './components/ImageContainer';
import Start from './components/Start';
import Navbar from './components/Navbar';
import calculateCoordinates from './utils/calculate-coordinates';
import characters from './utils/characters';
import areCoordinatesInRange from './utils/are-coordinates-in-range';
import Status from './components/Status';

interface Coordinates {
  x: number;
  y: number;
}

const App: FC = () => {
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [shouldDropdownRender, setShouldDropdownRender] = useState(false);
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

  const handleStartClick = (): void => setIsStartClicked(true);

  const handleImageClick = (
    event: React.MouseEvent<HTMLImageElement>,
  ): void => {
    setClickCoordinates(calculateCoordinates(event));
    setShouldDropdownRender(true);
    setDropdownPosition({ x: event.pageX, y: event.pageY });
  };

  const getCharacterData = async (character: string) => {
    const characterRef = doc(getFirestore(), 'characters', character);
    const characterSnap = await getDoc(characterRef);
    return characterSnap.data();
  };

  const handleDropdownClick = (
    event: React.MouseEvent<HTMLLIElement>,
  ): void => {
    setShouldDropdownRender(false);
    const id = event.currentTarget.getAttribute('data-id');
    const targetCharacter = characters.find((character) => character.id === id);
    if (targetCharacter) setCurrentCharacter(targetCharacter);
  };

  useEffect(() => {
    (async () => {
      const data = await getCharacterData(currentCharacter.name);
      if (data) {
        const { xMin, xMax, yMin, yMax } = data;
        const flag = areCoordinatesInRange(clickCoordinates, {
          xMin,
          xMax,
          yMin,
          yMax,
        });
        setSuccess(flag);
      }
    })();
  }, [currentCharacter]);

  return (
    <div className="App">
      <Navbar />
      {isStartClicked ? (
        <ImageContainer handleImageClick={handleImageClick} />
      ) : (
        <Start handleStartClick={handleStartClick} />
      )}
      {shouldDropdownRender && (
        <Dropdown
          characters={characters}
          dropdownPosition={dropdownPosition}
          handleDropdownClick={handleDropdownClick}
        />
      )}
      {success && <Status success={success} />}
    </div>
  );
};

export default App;
