"use client";

import React from "react";

interface Character {
  initiative: number;
  name: string;
  notes: string;
}

export default function InitiativeTracker() {
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [name, setName] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [initiative, setInitiative] = React.useState<number>(0);
  const [isSorted, setIsSorted] = React.useState<boolean>(false);

  const handleAddCharacter = () => {
    setCharacters([...characters, { initiative, name, notes }]);
    setName("");
    setInitiative(0);
    setNotes("");
  };

  const handleSortCharacters = () => {
    const sortedCharacters = [...characters].sort(
      (a, b) => b.initiative - a.initiative,
    );
    setCharacters(sortedCharacters);
    setIsSorted(true);
  };

  return (
    <section>
      <h2 className="text-xl text-white">Character Initiative Tracker</h2>
      <button
        className="rounded-sm bg-emerald-600 px-3 py-1 font-bold text-white hover:bg-emerald-700"
        onClick={handleSortCharacters}
      >
        Sort by Initiative
      </button>
      <table className="table text-white">
        <thead>
          <tr>
            <th>Name</th>
            <th>Notes</th>
            <th>Initiative</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character, index) => (
            <tr key={index}>
              <td>{character.name}</td>
              <td>{character.notes}</td>
              <td>{character.initiative}</td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Character Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Initiative"
                value={initiative}
                onChange={(e) => setInitiative(Number(e.target.value))}
              />
            </td>
            <td className="flex flex-row">
              <button
                className="rounded-sm bg-blue-500 px-2 text-white hover:bg-blue-700"
                onClick={handleAddCharacter}
              >
                Add Character
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
