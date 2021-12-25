import React, { useState } from 'react';
import PhotoContainer from './components/PhotoContainer';
import Start from './components/Start';

const App = () => {
  const [isStartClicked, setIsStaredClicked] = useState(false);

  const handleStartClick = (): void => setIsStaredClicked(true);

  return (
    <div className="App">
      {!isStartClicked && <Start handleStartClick={handleStartClick} />}
      {isStartClicked && <PhotoContainer />}
    </div>
  );
};

export default App;
