import DiceRoller from "./DiceRoller/DiceRoller";
import InitiativeTracker from "./InitiativeTracker";

export default function Toolkit() {
  return (
    <div className="my-3 flex flex-col items-center gap-3">
      <DiceRoller></DiceRoller>
      <InitiativeTracker></InitiativeTracker>
    </div>
  );
}
