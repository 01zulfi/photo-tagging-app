import React, { FC, useEffect, useState } from 'react';
import Dropdown from './components/Dropdown';
import ImageContainer from './components/ImageContainer';
import Start from './components/Start';
import Navbar from './components/Navbar';
import calculateCoordinates from './utils/calculate-coordinates';
import uniqueId from './utils/unique-id';

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
  const [characters] = useState([
    { name: 'Tom', id: uniqueId() },
    { name: 'Neo', id: uniqueId() },
    { name: 'Batman', id: uniqueId() },
  ]);
  const [clickCoordinates, setClickCoordinates] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const [currentCharacter, setCurrentCharacter] = useState<any>(null);

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
    setShouldDropdownRender(false);
    const id = event.currentTarget.getAttribute('data-id');
    const targetCharacter = characters.find((character) => character.id === id);
    setCurrentCharacter(targetCharacter);
  };

  useEffect(() => {
    console.log({ currentCharacter, clickCoordinates });
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
    </div>
  );
};

export default App;
