import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import ImageContainer from './components/ImageContainer';
import Start from './components/Start';

const App = () => {
  const [isStartClicked, setIsStartedClicked] = useState(false);
  const [shouldDropdownRender, setShouldDropdownRender] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const handleStartClick = (): void => setIsStartedClicked(true);

  const handleImageClick = (
    event: React.MouseEvent<HTMLImageElement>,
  ): void => {
    setShouldDropdownRender((prevProp) => !prevProp);
    setDropdownPosition({ x: event.pageX, y: event.pageY });
  };

  return (
    <div className="App">
      {isStartClicked ? (
        <ImageContainer handleImageClick={handleImageClick} />
      ) : (
        <Start handleStartClick={handleStartClick} />
      )}
      {shouldDropdownRender && <Dropdown dropdownPosition={dropdownPosition} />}
    </div>
  );
};

export default App;
