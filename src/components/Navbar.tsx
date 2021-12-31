import React, { FC } from 'react';
import Timer from './Timer';

interface NavbarProps {
  shouldTimerStart: boolean;
}

const Navbar: FC<NavbarProps> = ({ shouldTimerStart }) => (
  <div className="navbar">
    <h1>Photo Tagging App</h1>
    <Timer shouldTimerStart={shouldTimerStart} />
    <button className="leaderboard" type="button">
      Leaderboard
    </button>
  </div>
);

export default Navbar;
