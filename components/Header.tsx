"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();
  return (
    <div className="top-0 bg-indigo-950 py-2.5 fixed w-full">
      <header className="mx-auto container flex items-center px-2">
        <div>
          <Link href="/" className="text-2xl">GB energy</Link>
        </div>
        <div className="flex-1 text-end">
          <Link
            href="/"
            className={
              pathName === "/"
                ? "px-3 py-2 mr-2 border rounded-2xl"
                : "px-3 py-2 mr-2 rounded-2xl hover:bg-indigo-800"
            }
          >
            Live
          </Link>
          <Link
            href="/daily"
            className={
              pathName === "/daily"
                ? "px-3 py-2 mr-2 border rounded-2xl"
                : "px-3 py-2 mr-2 rounded-2xl hover:bg-indigo-800"
            }
          >
            24 Hours
          </Link>
        </div>
      </header>
    </div>
  );
}
