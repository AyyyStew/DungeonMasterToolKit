"use client";

import React, { useState } from "react";
import { useCharacterManager, Character } from "./useCharacterManager";
import CharacterSummary from "./CharacterSummary";

type CharacterField = {
  name: string;
  notes: string;
  initiative: number;
  hp: number;
  armor: number;
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
    <div className="flex">
      <div className="card mx-1 flex flex-col items-center bg-gray-600 p-2">
        <span className="justify-start pb-1 text-xs font-semibold">#</span>
        <input
          type="text"
          placeholder="Order"
          value={order}
          readOnly={true}
          className="input-field"
          style={{ maxWidth: "120px" }}
        />
      </div>

      <div className="card mx-1 flex flex-col items-center bg-gray-600 p-2">
        <span className="justify-start pb-1 text-xs font-semibold">Init</span>
        <input
          type="text"
          placeholder="Initiative"
          value={fields.initiative}
          onChange={(e) => onFieldChange("initiative", Number(e.target.value))}
          className="input-field"
          maxLength={2}
          style={{ maxWidth: "120px" }}
        />
      </div>

      <div className="card mx-1 flex flex-col items-center bg-gray-600 p-2">
        <span className="justify-start pb-1 text-xs font-semibold">HP</span>
        <input
          type="text"
          placeholder="HP"
          value={fields.hp}
          onChange={(e) => onFieldChange("hp", Number(e.target.value))}
          className="input-field"
          maxLength={3}
          style={{ maxWidth: "120px" }}
        />
      </div>

      <div className="card mx-1 flex flex-col items-center bg-gray-600 p-2">
        <span className="justify-start pb-1 text-xs font-semibold">Armor</span>
        <input
          type="text"
          placeholder="Armor"
          value={fields.armor}
          onChange={(e) => onFieldChange("armor", Number(e.target.value))}
          className="input-field"
          maxLength={2}
          style={{ maxWidth: "120px" }}
        />
      </div>
    </div>
    <div className="card mx-1 flex flex-col items-center bg-gray-600 p-2">
      <span className="justify-start pb-1 text-xs font-semibold">Name</span>
      <input
        type="text"
        placeholder="Character Name"
        value={fields.name}
        onChange={(e) => onFieldChange("name", e.target.value)}
        className="input-field !text-left"
      />
    </div>

    <div className="card mx-1 flex flex-col items-center bg-gray-600 p-2">
      <span className="justify-start pb-1 text-xs font-semibold">Notes</span>
      <textarea
        placeholder="Notes"
        value={fields.notes}
        rows={1}
        onChange={(e) => onFieldChange("notes", e.target.value)}
        className="input-field !text-left"
      />
    </div>
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
      if (field === "hp") setHp(value as number);
      if (field === "armor") setArmor(value as number);
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
    <section className="flex justify-center p-6">
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
            </div>
            <section>
              <h3>Turn Order</h3>
              <div className="flex flex-wrap gap-1">
                <div>
                  <CharacterSummary character={currentCharacter} />
                </div>
                <div>
                  <CharacterSummary character={nextCharacter} />
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
            isCurrent={character.id === currentCharacterId}
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
    </section>
  );
}
