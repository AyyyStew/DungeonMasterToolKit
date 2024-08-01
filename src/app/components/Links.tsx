"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import path from "path";

function makeLink(path: string, name: string, pathname: string) {
  console.log({ path, name, pathname });
  return (
    <li className="mx-2">
      <Link
        className={`link ${pathname === path ? "text-gradient" : "text-neutral-600"}`}
        href={path}
      >
        {name}
      </Link>
    </li>
  );
}

export function Links() {
  const pathname = usePathname();
  const paths: Record<string, string> = {
    // "/": "Home",
    // "/about": "About",
  };
  return (
    <nav>
      <ul className="flex flex-row">
        {Object.keys(paths).map((item) =>
          makeLink(item, paths[item], pathname),
        )}
      </ul>
    </nav>
  );
}
