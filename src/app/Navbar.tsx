"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsFillBugFill } from "react-icons/bs";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    {
      name: "Dashboard",
      url: "/",
    },
    {
      name: "Issues",
      url: "/issues",
    },
  ];

  return (
    <div className="navbar flex justify-between items-center md:px-10 px-5 py-5 border-b-2 border-zinc-200">
      <div className="navbar__logo flex items-center">
        <Link href="/" className="flex items-center">
          <BsFillBugFill />
          <span className="font-semibold text-zinc-600 text-lg ml-2">
            Issue Tracker
          </span>
        </Link>
      </div>
      <div className="navbar__links flex items-center space-x-5">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            className={classNames({
              "text-zinc-600": currentPath === link.url,
              "text-zinc-400": currentPath !== link.url,
              "font-semibold hover:text-zinc-600 transition duration-300": true,
            })}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
