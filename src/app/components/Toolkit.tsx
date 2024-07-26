import DiceRoller from "./DiceRoller";
import InitiativeTracker from "./InitiativeTracker";

export default function Toolkit() {
  return (
    <div className="flex justify-center">
      <div className="my-6 flex flex-col items-stretch gap-6">
        <DiceRoller></DiceRoller>
        <InitiativeTracker></InitiativeTracker>
      </div>
    </div>
  );
}
