"use client";

import React from "react";
import { Character } from "../hooks/useCharacterManager";

const CharacterSummary: React.FC<{
  character: Character | undefined;
  position: string;
}> = ({ character, position }) => {
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
    <div className="">
      <span className="text-xs font-semibold">{position}</span>
      <div className="flex items-center rounded-lg border-neutral-700 bg-neutral-800 text-white shadow-md">
        <div className="mx-7 text-lg">{character.name}</div>
        <div className="card flex flex-col-reverse items-center bg-neutral-700 p-2">
          <span className="text-xs font-semibold">HP</span>
          <span>{character.hp}</span>
        </div>
        <div className="card m-2 flex flex-col-reverse items-center bg-neutral-700 p-2">
          <span className="text-xs font-semibold">Armor</span>
          <span>{character.armor}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterSummary;
