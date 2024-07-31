"use client";
import React, { useState } from "react";
import Image from "next/image";

interface DiceRollResult {
  expression: string;
  rolls: number[];
  formattedRolls: string[];
  result: number;
  steps: string[];
}

const DiceRoller: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<DiceRollResult[]>([]);
  const [allCollapsed, setAllCollapsed] = useState<boolean>(true);
  const [inputError, setInputError] = useState<string>("");

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
    let allRolls: number[] = []; // To store all rolls
    let formattedRolls: string[] = [];

    while ((match = diceRegex.exec(expression)) !== null) {
      const [fullMatch, numDice, innerExpression] = match;
      const innerResult = eval(innerExpression);
      steps.push(
        `Evaluate inner expression: ${innerExpression} => ${innerResult}`,
      );
      const rolls = rollDice(innerResult, Number(numDice));
      allRolls = allRolls.concat(rolls); // Collect rolls
      formattedRolls = formattedRolls.concat(
        rolls.map((roll) => formatRoll(roll, innerResult)),
      );
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
      allRolls = allRolls.concat(rolls); // Collect rolls
      formattedRolls = formattedRolls.concat(
        rolls.map((roll) => formatRoll(roll, Number(numSides))),
      );
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
      rolls: allRolls,
      formattedRolls: formattedRolls,
      result: finalResult,
      steps,
    };
  };

  const formatRolls = (rolls: number[], numSides: number): string => {
    return rolls.map((roll) => formatRoll(roll, numSides)).join(", ");
  };

  const formatRoll = (roll: number, numSides: number): string => {
    const minRoll = 1;
    const maxRoll = numSides;
    if (roll === minRoll) {
      return `<span class='text-red-600 font-semibold'>${roll}</span>`;
    }
    if (roll === maxRoll) {
      return `<span class="text-emerald-400 font-semibold">${roll}</span>`;
    }
    return roll.toString();
  };

  function isValidDiceExpression(expression: string) {
    const diceRegex = /^(?!\s*$)(?:(?:\d+d\d+|\d+|[\d()+\-*/%d\s])*)$/;
    return diceRegex.test(expression);
  }

  const validateInput = () => {
    if (input === "" || input === null) {
      setInputError("Input cannot be empty.");
      return false;
    } else {
      if (!isValidDiceExpression(input)) {
        setInputError("Invalid dice expression.");
        return false;
      }
      setInputError("");
      return true;
    }
  };

  const handleRoll = () => {
    if (!validateInput()) {
      return;
    }
    const result = evaluateExpression(input);
    setResults([...results, result]);
  };

  const toggleCollapse = () => {
    setAllCollapsed(!allCollapsed);
  };

  const handleCommonRoll = (diceExpression: string) => {
    if (input === "") {
      setInput(diceExpression);
    } else {
      setInput(`${input} + ${diceExpression}`);
    }
    setInputError("");
  };

  const diceExpressions = [
    "1d4",
    "1d6",
    "1d8",
    "1d10",
    "1d12",
    "1d20",
    "1d100",
  ];
  const diceSvgs = [
    "/d4.svg",
    "/d6.svg",
    "/d8.svg",
    "/d10.svg",
    "/d12.svg",
    "/d20.svg",
    "/d100.svg",
  ];
  const buttonStyles = [
    "bg-gradient-to-r from-pink-700 from-10% to-pink-500",
    "bg-gradient-to-r from-red-700 from-10% to-red-500",
    "bg-gradient-to-r from-yellow-700 from-10% to-yellow-500",
    "bg-gradient-to-r from-green-700 from-10% to-green-500",
    "bg-gradient-to-r from-blue-700 from-10% to-blue-500",
    "bg-gradient-to-r from-indigo-700 from-10% to-indigo-500",
    "bg-gradient-to-r from-purple-700 from-10% to-purple-500",
  ];

  return (
    <section className="card bg-gradient-dark w-full max-w-5xl p-6 shadow">
      <div className="mb-4 flex align-baseline">
        <Image
          className="mr-3"
          src="./d20.svg"
          alt="a four sided dice"
          width={25}
          height={25}
        ></Image>
        <h2 className="text-gradient text-2xl font-semibold">Dice Roller</h2>
      </div>
      <div className="mb-4 grid grid-cols-[1fr] gap-2 sm:grid-cols-[9fr_1fr]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter dice expression (e.g., 2d8 + 4d6 * 2)"
          className="input-field w-full rounded text-center shadow"
        />
        <button
          onClick={handleRoll}
          className="duration-400 button blue-button justify-self-center rounded-lg px-6 py-3 font-semibold"
        >
          Roll
        </button>
      </div>

      {inputError && <p className="text-center text-red-500">{inputError}</p>}
      <div className="mb-4 flex flex-wrap justify-center space-x-2">
        {diceExpressions.map((dice, index) => (
          <div
            className={`button mb-2 flex ${buttonStyles[index]} w-max rounded-lg px-4 py-2`}
            key={dice}
            onClick={() => handleCommonRoll(dice)}
          >
            <button>{dice}</button>
            <Image
              className="ml-2"
              src={diceSvgs[index]}
              alt="a four sided dice"
              width={20}
              height={20}
            ></Image>
          </div>
        ))}
      </div>
      <div className="max-w-[100vw] overflow-x-auto">
        <p className="text- mb-2 text-white">
          Click the button to toggle calculation details
        </p>

        <div className="flex flex-row-reverse justify-end gap-3 pb-4 text-white shadow">
          {results.map((result, index) => (
            <div
              onClick={toggleCollapse}
              key={index}
              className={`button card card w-75 card-gradient min-w-[100px] max-w-[250px] flex-none rounded-md p-4 ${index === results.length - 1 ? "selected" : ""}`}
            >
              <p className="text-xl font-semibold">Result: {result.result}</p>
              <p className="font-normal">
                Rolls:{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: result.formattedRolls.join(", "),
                  }}
                />
              </p>

              {!allCollapsed && (
                <>
                  <h2 className="text-lg">Expression: {result.expression}</h2>
                  <ul className="mt-2 list-inside list-disc">
                    {result.steps.map((step, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiceRoller;
