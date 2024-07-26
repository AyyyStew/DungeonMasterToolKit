"use client";

import React from "react";
import { Character, CharacterField } from "../hooks/useCharacterManager";

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
      <div className="card mx-1 flex max-w-[25%] flex-col items-center bg-gray-600 p-2">
        <span className="justify-start pb-1 text-xs font-semibold">#</span>
        <input
          type="text"
          placeholder="Order"
          value={order}
          readOnly={true}
          className="input-field text-center"
        />
      </div>

      <div className="card mx-1 flex max-w-[25%] flex-col items-center bg-gray-600 p-2">
        <span className="justify-start pb-1 text-xs font-semibold">Init</span>
        <input
          type="number"
          placeholder="Initiative"
          value={fields.initiative}
          onChange={(e) => onFieldChange("initiative", Number(e.target.value))}
          className="input-field text-center"
          maxLength={2}
        />
      </div>

      <div className="card mx-1 flex max-w-[25%] flex-col items-center bg-gray-600 p-2">
        <span className="justify-start pb-1 text-xs font-semibold">HP</span>
        <input
          type="number"
          placeholder="HP"
          value={fields.hp}
          onChange={(e) => onFieldChange("hp", Number(e.target.value))}
          className="input-field text-center"
          maxLength={3}
        />
      </div>

      <div className="card mx-1 flex max-w-[25%] flex-col items-center bg-gray-600 p-2">
        <span className="justify-start pb-1 text-xs font-semibold">Armor</span>
        <input
          type="number"
          placeholder="Armor"
          value={fields.armor}
          onChange={(e) => onFieldChange("armor", Number(e.target.value))}
          className="input-field w-full text-center"
          maxLength={2}
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

export default CharacterItem;
