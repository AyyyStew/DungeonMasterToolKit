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

  const handleTurnChange = (increment: number) => {
    if (characters.length > 0) {
      const newPointer =
        (turnPointer + increment + characters.length) % characters.length;
      setTurnPointer(newPointer);
      if (newPointer === 0) {
        setRound(round + (increment === 1 ? 1 : -1));
      }
    }
  };

  const handleFieldChange = (
    field: keyof CharacterField,
    value: string | number,
  ) => {
    if (editId) {
      handleChangeCharacter(editId, field, value);
    } else {
      switch (field) {
        case "name":
          setName(value as string);
          break;
        case "notes":
          setNotes(value as string);
          break;
        case "initiative":
          setInitiative(value as number);
          break;
        case "hp":
          setHp(value as number);
          break;
        case "armor":
          setArmor(value as number);
          break;
      }
    }
  };

  return (
    <section className="card bg-gradient-dark w-full max-w-5xl p-6 shadow">
      <section className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-gradient mb-2 text-2xl font-semibold">
          Initiative Tracker
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <button
            className="button red-button w-full p-2"
            onClick={() => handleTurnChange(-1)}
          >
            Previous Turn
          </button>
          <button
            className="button grey-button w-full p-2"
            onClick={handleSortCharacters}
          >
            Sort by Initiative
          </button>
          <button
            className="button blue-button w-full p-2"
            onClick={() => handleTurnChange(1)}
          >
            Next Turn
          </button>
        </div>
      </section>

      <section className="mb-4 font-semibold text-white">
        <div>
          <section className="mb-4">
            <div>Round: {round}</div>
            <div className="flex gap-2 overflow-x-auto">
              {[currentCharacter, nextCharacter, nextNextCharacter].map(
                (character, index) => (
                  <CharacterSummary
                    key={index}
                    character={character}
                    position={
                      index === 0 ? "Current" : index === 1 ? "Next" : "On Deck"
                    }
                    onFieldChange={(field, value) =>
                      handleChangeCharacter(character.id, field, value)
                    }
                  />
                ),
              )}
            </div>
          </section>
        </div>
      </section>
      <section>
        <div className="font-semibold text-white">
          <h4>Add Characters</h4>
        </div>
        {characters.map((character, index) => (
          <CharacterItem
            key={character.id}
            character={character}
            isCurrent={character.id === currentCharacter?.id}
            fields={character}
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
      </section>
    </section>
  );
}
