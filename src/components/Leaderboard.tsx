import React, { FC, useEffect, useState } from 'react';
import firebase from '../firebase/firebase';

const Leaderboard: FC = () => {
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const scores = await firebase.fetchScores();
      const filteredScores = scores.sort((a, b) => a.score - b.score);
      setList(filteredScores);
    })();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      {list.map((item: any) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.score}</p>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
