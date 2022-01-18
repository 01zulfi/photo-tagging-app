import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: fit-content;
  position: absolute;
  left: ${(props: any) => `${props.x}px`};
  top: ${(props: any) => `${props.y}px`};
`;

const List = styled.ul`
  position: absolute;
  top: 0;
  z-index: 1;
  width: fit-content;
  padding: 10px;
  list-style: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  alignitems: center;
  gap: 10px;
  color: white;
  background-color: rgba(18, 18, 18, 0.9);
`;

const ListItem = styled.li`
  font-weight: 800;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.11);
  }
`;

interface DropdownProps {
  dropdownPosition: { x: number; y: number };
  characters: { name: string; id: string }[];
  handleDropdownClick: any;
}

const Dropdown: FC<DropdownProps> = ({
  handleDropdownClick,
  characters,
  dropdownPosition,
}) => {
  const { x, y } = dropdownPosition;

  return (
    <Wrapper x={x} y={y}>
      <List>
        {characters.map((character) => (
          <ListItem
            key={character.id}
            aria-hidden="true"
            onClick={handleDropdownClick}
            data-id={character.id}
          >
            {character.name}
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
};

export default Dropdown;
