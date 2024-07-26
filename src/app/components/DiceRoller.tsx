"use client";
import React, { useState } from "react";

interface DiceRollResult {
  expression: string;
  rolls: number[];
  result: number;
  steps: string[];
  isCollapsed?: boolean;
}

const DiceRoller: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<DiceRollResult[]>([]);

  const rollDice = (sides: number, times: number): number[] => {
    const rolls = [];
    for (let i = 0; i < times; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    return rolls;
  };

  const evaluateExpression = (expression: string): DiceRollResult => {
    const steps: string[] = [];
    const diceRegex = /(\d+)d\(([^)]+)\)/g;
    let match;
    let modifiedExpression = expression;

    while ((match = diceRegex.exec(expression)) !== null) {
      const [fullMatch, numDice, innerExpression] = match;
      const innerResult = eval(innerExpression);
      steps.push(
        `Evaluate inner expression: ${innerExpression} => ${innerResult}`,
      );
      const rolls = rollDice(innerResult, Number(numDice));
      const sumOfRolls = rolls.reduce((sum, roll) => sum + roll, 0);
      steps.push(
        `${fullMatch} => [${formatRolls(rolls, innerResult)}] => ${sumOfRolls}`,
      );
      modifiedExpression = modifiedExpression.replace(
        fullMatch,
        sumOfRolls.toString(),
      );
    }

    const finalDiceRegex = /(\d+)d(\d+)/g;
    while ((match = finalDiceRegex.exec(modifiedExpression)) !== null) {
      const [fullMatch, numDice, numSides] = match;
      const rolls = rollDice(Number(numSides), Number(numDice));
      const sumOfRolls = rolls.reduce((sum, roll) => sum + roll, 0);
      steps.push(
        `${fullMatch} => [${formatRolls(rolls, Number(numSides))}] => ${sumOfRolls}`,
      );
      modifiedExpression = modifiedExpression.replace(
        fullMatch,
        sumOfRolls.toString(),
      );
    }

    const finalResult = eval(modifiedExpression); // Evaluating the final arithmetic expression
    steps.push(`Final expression: ${modifiedExpression} => ${finalResult}`);

    return {
      expression,
      rolls: [],
      result: finalResult,
      steps,
    };
  };

  const formatRolls = (rolls: number[], numSides: number): string => {
    const minRoll = 1;
    const maxRoll = numSides;
    return rolls
      .map((roll) => {
        if (roll === minRoll) {
          return `<span class='text-red-400'>${roll}</span>`;
        }
        if (roll === maxRoll) {
          return `<span class="text-emerald-300">${roll}</span>`;
        }
        return roll.toString();
      })
      .join(", ");
  };

  const handleRoll = () => {
    const result = evaluateExpression(input);
    setResults([...results, result]);
  };

  const toggleSteps = (index: number) => {
    const updatedResults = [...results];
    updatedResults[index].isCollapsed = !updatedResults[index].isCollapsed;
    setResults(updatedResults);
  };

  return (
    <div className="card max-w-5xl bg-gray-800 p-6 text-white">
      <h1 className="mb-4 text-center text-3xl font-bold">Dice Roller</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter dice expression (e.g., 2d8 + 4d6 * 2)"
          className="input-field rounded border border-gray-600 bg-gray-700 px-4 py-2 text-center text-white"
        />
        <button
          onClick={handleRoll}
          className="ml-4 rounded bg-blue-600 px-4 py-2 transition duration-300 hover:bg-blue-500"
        >
          Roll
        </button>
      </div>
      <div className="flex flex-row-reverse justify-end gap-3 overflow-x-scroll">
        {results.map((result, index) => (
          <div
            key={index}
            className={`card w-75 rounded bg-gray-700 p-4 ${index === results.length - 1 ? "border border-yellow-500" : ""}`}
          >
            <h2 className="text-xl font-semibold">
              Expression: {result.expression}
            </h2>
            <p className="text-lg">Result: {result.result}</p>
            <h3 className="mt-2 text-lg font-semibold">
              <button onClick={() => toggleSteps(index)}>
                {result.isCollapsed ? "Steps" : "Hide"}
              </button>
            </h3>
            {!result.isCollapsed && (
              <ul className="list-inside list-disc">
                {result.steps.map((step, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiceRoller;
