"use client";

import React, { useState } from "react";
import { useCharacterManager, Character } from "./useCharacterManager";

type CharacterField = {
  name: string;
  notes: string;
  initiative: number;
};

const CharacterItem: React.FC<{
  character?: Character;
  isCurrent?: boolean;
  editId?: string | null;
  fields: CharacterField;
  order: number;
  onFieldChange: (field: keyof CharacterField, value: string | number) => void;
  onDelete?: () => void;
  onSubmit: () => void;
}> = ({
  character,
  isCurrent,
  editId,
  fields,
  order,
  onFieldChange,
  onDelete,
  onSubmit,
}) => (
  <div className={`grid-item ${isCurrent ? "selected" : "bg-gray-800"}`}>
    <div className="font-semibold md:hidden">#</div>
    <input
      type="text"
      placeholder="Order"
      value={order}
      readOnly={true}
      className="input-field"
      style={{ maxWidth: "120px" }}
    />

    <div className="font-semibold md:hidden">Initiative</div>
    <input
      type="number"
      placeholder="Initiative"
      value={fields.initiative}
      onChange={(e) => onFieldChange("initiative", Number(e.target.value))}
      className="input-field"
      maxLength={2}
      style={{ maxWidth: "120px" }}
    />
    <div className="font-semibold md:hidden">Name</div>
    <input
      type="text"
      placeholder="Character Name"
      value={fields.name}
      onChange={(e) => onFieldChange("name", e.target.value)}
      className="input-field"
    />
    <div className="font-semibold md:hidden">Notes</div>
    <textarea
      placeholder="Notes"
      value={fields.notes}
      onChange={(e) => onFieldChange("notes", e.target.value)}
      className="input-field"
    />

    {character ? (
      <button className="button delete-button" onClick={onDelete}>
        Delete
      </button>
    ) : (
      <button className="button add-button" onClick={onSubmit}>
        Add Character
      </button>
    )}
  </div>
);

export default function InitiativeTracker() {
  const [round, setRound] = useState(1); // Add round state
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index

  const {
    characters,
    name,
    notes,
    initiative,
    editId,
    currentCharacterId,
    setName,
    setNotes,
    setInitiative,
    handleAddCharacter,
    handleDeleteCharacter,
    handleSortCharacters,
    handleChangeCharacter,
    handleNextTurn,
    handlePreviousTurn,
  } = useCharacterManager();

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
    }
  };

  const currentCharacter = characters.find(
    (character) => character.id === currentCharacterId,
  );

  const totalCharacters = characters.length;

  const handleNextTurnWithRoundUpdate = () => {
    if (totalCharacters === 0) return; // No characters to cycle through

    // Update the index
    const nextIndex = (currentIndex + 1) % totalCharacters;
    setCurrentIndex(nextIndex);

    // Check if we've completed a full cycle
    if (nextIndex === 0) {
      setRound((prevRound) => prevRound + 1);
    }

    // Call the existing handleNextTurn function
    handleNextTurn();
  };

  const handlePreviousTurnWithRoundUpdate = () => {
    if (totalCharacters === 0) return; // No characters to cycle through

    // Update the index
    const prevIndex = (currentIndex - 1 + totalCharacters) % totalCharacters;
    setCurrentIndex(prevIndex);

    // Check if we've completed a full cycle in reverse
    if (currentIndex === 0) {
      setRound((prevRound) => prevRound - 1);
    }

    // Call the existing handlePreviousTurn function
    handlePreviousTurn();
  };

  const nextCharacter = characters[(currentIndex + 1) % totalCharacters];

  return (
    <div className="flex flex-col justify-center p-6">
      <section className="w-full max-w-5xl rounded-lg bg-gray-800 p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Character Initiative Tracker
        </h2>
        <section className="mb-4 font-semibold text-white">
          <div>
            <div>Round: {round}</div>
            <div>
              Current Turn: {currentCharacter ? currentCharacter.name : "N/A"}
            </div>
            <div>Next Turn: {nextCharacter ? nextCharacter.name : "N/A"}</div>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button
              className="button sort-button"
              onClick={handleSortCharacters}
            >
              Sort by Initiative
            </button>
            <button
              className="button navigation-button"
              onClick={handlePreviousTurnWithRoundUpdate} // Use the updated handler
            >
              Previous Turn
            </button>
            <button
              className="button navigation-button"
              onClick={handleNextTurnWithRoundUpdate} // Use the updated handler
            >
              Next Turn
            </button>
          </div>
        </section>
        <div className="grid-header text-white">
          <div className="font-semibold">Order</div>
          <div className="font-semibold">Initiative</div>
          <div className="font-semibold">Name</div>
          <div className="font-semibold">Notes</div>
          <div className="font-semibold">Action</div>
        </div>
        {characters.map((character, index) => (
          <CharacterItem
            key={character.id}
            character={character}
            isCurrent={character.id === currentCharacterId}
            fields={{
              name: character.name,
              notes: character.notes,
              initiative: character.initiative,
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
          fields={{ name, notes, initiative }}
          order={characters.length + 1}
          onFieldChange={handleFieldChange}
          onSubmit={handleAddCharacter}
        />
      </section>
    </div>
  );
}
