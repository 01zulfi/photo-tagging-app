import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from '../firebase/firebase';

const Container = styled.section`
  width: 85%;
  color: white;
  box-shadow: 0px 15px 30px rgb(0 0 0 / 15%);
  margin-top: 25px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 15px;
`;

const Heading = styled.h1`
  color: #d1c4e9;
  padding: 10px;
  text-decoration: underline;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-around;
  width: 85%;
  margin: 5px;
  padding: 10px;
  align-items: center;
`;

const Index = styled.div`
  display: flex;
  gap: 5px;
  color: #b2dfdb;
  font-weight: bold;
`;

const ScoreboardItem = styled.div`
  border-radius: 5px;
  width: 85%;
  margin-left: auto;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  border: ${(props: any) => (props.first ? '2px solid #FFD54F' : 0)};
  font-size: ${(props: any) => (props.first ? '1.4em' : '1em')};
  background: ${function backgroundChanger(props: any) {
    return props.first ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.07)';
  }};
`;

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
    <Container>
      <Heading>Leaderboard</Heading>
      {list.map((item: any, index: number) => (
        <ListItem key={item.id}>
          <Index>
            <p>{index + 1}</p>
            <p>|</p>
          </Index>
          <ScoreboardItem first={index === 0}>
            <p>{item.name}</p>
            <p>{`${item.score}s`}</p>
          </ScoreboardItem>
        </ListItem>
      ))}
    </Container>
  );
};

export default Leaderboard;
