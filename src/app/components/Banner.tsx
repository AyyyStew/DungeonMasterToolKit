import { Links } from "./Links";

export default function Banner() {
  return (
    <header className="flex flex-row justify-between bg-gray-700 px-5 py-3 shadow-md">
      <h1 className="text-2xl text-emerald-500">
        Dungeon Master&apos;s Toolkit
      </h1>
      <Links></Links>
    </header>
  );
}
