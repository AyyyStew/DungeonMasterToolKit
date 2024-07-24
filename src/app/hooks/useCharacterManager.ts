import { useState, useEffect } from "react";

export interface Character {
  id: string; // Unique identifier
  initiative: number;
  name: string;
  notes: string;
  hp: number; // Hit points
  armor: number; // Armor value
}

export type CharacterField = {
  name: string;
  notes: string;
  initiative: number;
  hp: number;
  armor: number;
};

export function useCharacterManager() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [initiative, setInitiative] = useState<number>(0);
  const [hp, setHp] = useState<number>(0);
  const [armor, setArmor] = useState<number>(0);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [currentCharacterId, setCurrentCharacterId] = useState<string | null>(null);

  useEffect(() => {
    if (characters.length === 0) {
      setCurrentCharacterId(null);
    } else if (currentCharacterId && !characters.some(character => character.id === currentCharacterId)) {
      setCurrentCharacterId(characters[0].id);
    }
  }, [characters, currentCharacterId]);

  const handleAddCharacter = () => {
    if (editId !== null) {
      // Edit existing character
      const updatedCharacters = [...characters];
      const index = updatedCharacters.findIndex(character => character.id === editId);
      if (index !== -1) {
        updatedCharacters[index] = { id: editId, initiative, name, notes, hp, armor };
        setCharacters(updatedCharacters);
        setEditId(null);
      }
    } else {
      // Add new character
      const newCharacter = { id: new Date().toISOString(), initiative, name, notes, hp, armor };
      setCharacters([...characters, newCharacter]);
      if (characters.length === 0){
        setCurrentCharacterId(newCharacter.id); // Select new character
      }
    }
    setName("");
    setInitiative(0);
    setNotes("");
    setHp(0);
    setArmor(0);
  };

  const handleEditCharacter = (id: string) => {
    const character = characters.find(character => character.id === id);
    if (character) {
      setName(character.name);
      setNotes(character.notes);
      setInitiative(character.initiative);
      setHp(character.hp);
      setArmor(character.armor);
      setEditId(id);
    }
  };

  const handleSortCharacters = () => {
    const sortedCharacters = [...characters].sort(
      (a, b) => b.initiative - a.initiative,
    );
    setCharacters(sortedCharacters);
    setIsSorted(true);
  };

  const handleDeleteCharacter = (id: string) => {
    const updatedCharacters = characters.filter(character => character.id !== id);

    const currentIndex = characters.findIndex(character => character.id === id)
    setCharacters(updatedCharacters);
    const nextInLine = (currentIndex+1) >= characters.length ? null : characters[currentIndex+1].id
    if (currentCharacterId === id) {
      setCurrentCharacterId(updatedCharacters.length > 0 ? nextInLine : null);
    }
    if (editId === id) {
      setEditId(null);
    }
  };

  const handleChangeCharacter = (
    id: string,
    field: keyof Character,
    value: string | number,
  ) => {
    const updatedCharacters = characters.map(character =>
      character.id === id
        ? { ...character, [field]: field === "initiative" || field === "hp" || field === "armor" ? Number(value) : value }
        : character
    );
    setCharacters(updatedCharacters);
  };

  const handleNextTurn = () => {
    if (!currentCharacterId || characters.length === 0) return;
    const currentIndex = characters.findIndex(character => character.id === currentCharacterId);
    const nextIndex = (currentIndex + 1) % characters.length;
    setCurrentCharacterId(characters[nextIndex].id);
  };

  const handlePreviousTurn = () => {
    if (!currentCharacterId || characters.length === 0) return;
    const currentIndex = characters.findIndex(character => character.id === currentCharacterId);
    const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
    setCurrentCharacterId(characters[prevIndex].id);
  };

  return {
    characters,
    name,
    notes,
    initiative,
    hp,
    armor,
    isSorted,
    editId,
    currentCharacterId,
    setName,
    setNotes,
    setInitiative,
    setHp,
    setArmor,
    handleAddCharacter,
    handleEditCharacter,
    handleSortCharacters,
    handleDeleteCharacter,
    handleChangeCharacter,
    handleNextTurn,
    handlePreviousTurn,
  };
}
