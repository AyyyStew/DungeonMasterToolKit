"use client";

import React, { useState, useEffect } from "react";
import {
  useCharacterManager,
  CharacterField,
} from "../hooks/useCharacterManager";
import CharacterSummary from "./CharacterSummary";
import CharacterItem from "./CharacterItem";
import { calculateTurnOrder } from "../utils/turnUtils";

export default function InitiativeTracker() {
  const {
    characters,
    name,
    notes,
    initiative,
    hp,
    armor,
    editId,
    currentCharacterId,
    setName,
    setNotes,
    setInitiative,
    setHp,
    setArmor,
    handleAddCharacter,
    handleDeleteCharacter,
    handleSortCharacters,
    handleChangeCharacter,
  } = useCharacterManager();

  const [round, setRound] = useState(1);
  const [turnPointer, setTurnPointer] = useState(0);

  const { currentCharacter, nextCharacter, nextNextCharacter } =
    calculateTurnOrder(characters, turnPointer);

  useEffect(() => {
    if (characters.length > 0 && !currentCharacterId) {
      setTurnPointer(0);
    }
  }, [characters, currentCharacterId]);

  function nextTurnHandler() {
    if (characters.length > 0) {
      const newPointer = (turnPointer + 1) % characters.length;
      if (newPointer === 0) {
        setRound(round + 1);
      }
      setTurnPointer(turnPointer + 1);
    }
  }

  function previousTurnHandler() {
    if (turnPointer > 0) {
      const newPointer =
        (turnPointer - 1 + characters.length) % characters.length;
      if (newPointer === characters.length - 1) {
        setRound(round - 1);
      }
      setTurnPointer(turnPointer - 1);
    }
  }

  const handleFieldChange = (
    field: keyof CharacterField,
    value: string | number,
  ) => {
    if (editId) {
      handleChangeCharacter(editId, field, value);
    } else {
      if (field === "name") setName(value as string);
      if (field === "notes") setNotes(value as string);
      if (field === "initiative") setInitiative(value as number);
      if (field === "hp") setHp(value as number);
      if (field === "armor") setArmor(value as number);
    }
  };

  return (
    <div className="card w-full max-w-5xl bg-gray-800 p-6">
      <h2 className="mb-4 text-2xl font-semibold text-white">
        Initiative Tracker
      </h2>
      <section className="mb-4 font-semibold text-white">
        <div>
          <div className="flex flex-wrap items-center justify-between">
            <div>Round: {round}</div>
            <div className="flex justify-end gap-4">
              <button
                className="button sort-button"
                onClick={handleSortCharacters}
              >
                Sort by Initiative
              </button>
              <button
                className="button navigation-button"
                onClick={previousTurnHandler}
              >
                Previous Turn
              </button>
              <button
                className="button navigation-button"
                onClick={nextTurnHandler}
              >
                Next Turn
              </button>
            </div>
          </div>
          <section>
            <h3>Turn Order</h3>
            <div className="flex flex-wrap gap-1">
              <div>
                <CharacterSummary
                  character={currentCharacter}
                  position="Current"
                />
              </div>
              <div>
                <CharacterSummary character={nextCharacter} position="Next" />
              </div>
              <div>
                <CharacterSummary
                  character={nextNextCharacter}
                  position="On Deck"
                />
              </div>
            </div>
          </section>
        </div>
      </section>
      <div className="text-white">
        <h4>Add Characters</h4>
      </div>
      {characters.map((character, index) => (
        <CharacterItem
          key={character.id}
          character={character}
          isCurrent={character.id === currentCharacter?.id}
          fields={{
            name: character.name,
            notes: character.notes,
            initiative: character.initiative,
            hp: character.hp,
            armor: character.armor,
          }}
          order={index + 1}
          onFieldChange={(field, value) =>
            handleChangeCharacter(character.id, field, value)
          }
          onDelete={() => handleDeleteCharacter(character.id)}
          onSubmit={() => null}
        />
      ))}
      <CharacterItem
        editId={editId}
        fields={{ name, notes, initiative, hp, armor }}
        order={characters.length + 1}
        onFieldChange={handleFieldChange}
        onSubmit={handleAddCharacter}
      />
    </div>
  );
}
