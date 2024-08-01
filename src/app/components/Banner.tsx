import { Links } from "./Links";

export default function Banner() {
  return (
    <header className="flex flex-row items-center justify-between bg-neutral-800 px-5 py-3 shadow-md">
      <h1 className="text-gradient text-2xl font-bold">
        Dungeon Master Assistant
      </h1>
      <Links></Links>
    </header>
  );
}
