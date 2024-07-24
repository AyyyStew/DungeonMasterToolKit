"use client";

import React from "react";
import { Character } from "./useCharacterManager";

const CharacterSummary: React.FC<{ character: Character | undefined }> = ({
  character,
}) => {
  if (!character) {
    character = {
      hp: 0,
      armor: 0,
      name: "Name",
      id: "",
      initiative: 0,
      notes: "",
    };
  }

  return (
    <div className="flex items-center rounded-lg border-gray-600 bg-gray-700 text-white shadow-md">
      <div className="mx-7 text-lg">{character.name || "Character"}</div>
      <div className="card flex flex-col-reverse items-center bg-gray-600 p-2">
        <span className="text-xs font-semibold">HP</span>
        <span>{character.hp || 0}</span>
      </div>
      <div className="card m-2 flex flex-col-reverse items-center bg-gray-600 p-2">
        <span className="text-xs font-semibold">Armor</span>
        <span>{character.armor || 0}</span>
      </div>
    </div>
  );
};

export default CharacterSummary;
