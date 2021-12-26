import React, { FC } from 'react';

interface Props {
  dropdownPosition: { x: number; y: number };
  characters: { name: string; id: string }[];
  handleDropdownClick: any;
}

const Dropdown: FC<Props> = ({
  handleDropdownClick,
  characters,
  dropdownPosition,
}) => {
  const { x, y } = dropdownPosition;

  return (
    <div
      style={{
        width: 'fit-content',
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
      <ul
        style={{
          position: 'absolute',
          top: '0',
          zIndex: '1',
          width: 'fit-content',
          padding: '10px',
          listStyle: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'white',
        }}
      >
        {characters.map((character) => (
          <li
            key={character.id}
            aria-hidden="true"
            onClick={handleDropdownClick}
            data-id={character.id}
          >
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
