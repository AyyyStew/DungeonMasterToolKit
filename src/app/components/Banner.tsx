import { Links } from "./Links";

export default function Banner() {
  return (
    <header className="flex flex-row items-center justify-between bg-neutral-800 px-5 py-3 shadow-md">
      <h1 className="font-mono text-2xl text-emerald-500">
        Dungeon Master Assistant
      </h1>
      <Links></Links>
    </header>
  );
}
