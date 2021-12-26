import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import ImageContainer from './components/ImageContainer';
import Start from './components/Start';
import Navbar from './components/Navbar';

const App = () => {
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [shouldDropdownRender, setShouldDropdownRender] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [characters] = useState([
    { name: 'Tom', id: '1' },
    { name: 'Neo', id: '2' },
    { name: 'Batman', id: '3' },
  ]);

  const handleStartClick = (): void => setIsStartClicked(true);

  const handleImageClick = (
    event: React.MouseEvent<HTMLImageElement>,
  ): void => {
    setShouldDropdownRender(true);
    setDropdownPosition({ x: event.pageX, y: event.pageY });
  };

  const handleDropdownClick = (): void => setShouldDropdownRender(false);

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
