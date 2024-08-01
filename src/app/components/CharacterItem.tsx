"use client";

import React from "react";
import { Character, CharacterField } from "../hooks/useCharacterManager";
import { StatField } from "./StatField";

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
  <div className={`grid-item ${isCurrent ? "selected" : ""} shadow`}>
    <div className="flex items-center gap-1">
      <div className="card mx-1 max-w-[25%]">
        <span className="font-bold">#{order}</span>
      </div>

      <StatField
        label="Init"
        type="number"
        placeholder="Initiative"
        value={fields.initiative}
        onChange={(value) => onFieldChange("initiative", value)}
        maxLength={2}
      />

      <StatField
        label="HP"
        type="number"
        placeholder="HP"
        value={fields.hp}
        onChange={(value) => onFieldChange("hp", value)}
        maxLength={3}
      />

      <StatField
        label="Armor"
        type="number"
        placeholder="Armor"
        value={fields.armor}
        onChange={(value) => onFieldChange("armor", value)}
        maxLength={2}
      />
    </div>

    <div className="card flex flex-col items-center border border-neutral-700 px-1">
      <span className="mx-1 my-1 self-start text-xs font-semibold">Name</span>
      <input
        type="text"
        placeholder="Character Name"
        value={fields.name}
        onChange={(e) => onFieldChange("name", e.target.value)}
        className="input-field input-field mx-2 w-full bg-neutral-900 !text-left"
      />
    </div>

    <div className="card flex flex-col items-center border border-neutral-700 px-1">
      <span className="mx-1 my-1 self-start text-xs font-semibold">Notes</span>
      <textarea
        placeholder="Notes"
        value={fields.notes}
        rows={1}
        onChange={(e) => onFieldChange("notes", e.target.value)}
        className="input-field input-field mx-2 w-full bg-neutral-900 !text-left"
      />
    </div>
    {character ? (
      <button className="button blue-button ml-1" onClick={onDelete}>
        Delete
      </button>
    ) : (
      <button className="button red-button ml-1" onClick={onSubmit}>
        Add Character
      </button>
    )}
  </div>
);

export default CharacterItem;
