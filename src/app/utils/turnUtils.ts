import { Character } from "../hooks/useCharacterManager";

export function calculateTurnOrder(
  characters: Character[],
  turnPointer: number
) {
  const currentCharacter = characters[turnPointer % characters.length] || null;
  const nextCharacter = characters[(turnPointer + 1) % characters.length] || null;
  const nextNextCharacter = characters[(turnPointer + 2) % characters.length] || null;

  return { currentCharacter, nextCharacter, nextNextCharacter };
}
