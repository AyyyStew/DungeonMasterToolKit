"use client";

import React from "react";
import { Character, CharacterField } from "../hooks/useCharacterManager";
import { StatField } from "./StatField";

const CharacterSummary: React.FC<{
  character: Character | undefined;
  position: string;
  onFieldChange: (field: keyof CharacterField, value: string | number) => void;
}> = ({ character, position, onFieldChange }) => {
  if (!character) {
    character = {
      hp: 0,
      armor: 0,
      name: "Empty",
      id: "",
      initiative: 0,
      notes: "",
    };
    onFieldChange = () => {};
  }

  return (
    <div>
      <span className="text-sm font-semibold">{position}</span>
      <div className="flex items-center rounded-lg bg-neutral-800 px-2 py-1 text-white shadow">
        <div className="ml-3 mr-3 text-lg">{character.name}</div>
        <div className="flex gap-1">
          <StatField
            label="HP"
            type="number"
            placeholder="HP"
            value={character.hp}
            onChange={(value) => onFieldChange("hp", value)}
            maxLength={2}
          />
          <StatField
            label="Armor"
            type="number"
            placeholder="Armor"
            value={character.armor}
            onChange={(value) => onFieldChange("armor", value)}
            maxLength={2}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterSummary;
