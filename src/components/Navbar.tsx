import React, { FC } from 'react';

const Navbar:FC = () => (
  <div className="navbar">
    <h1>Photo Tagging App</h1>
    <div className="timer" />
    <button className="leaderboard" type="button">Leaderboard</button>
  </div>
);

export default Navbar;
