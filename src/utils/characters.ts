import uniqueId from './unique-id';

interface Character {
  name: string;
  id: string;
}

const characters: Character[] = [
  { name: 'Tom', id: uniqueId() },
  { name: 'Neo', id: uniqueId() },
  { name: 'Batman', id: uniqueId() },
];

export default characters;
