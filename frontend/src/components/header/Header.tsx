import { Door } from "phosphor-react";
import React from "react";

export const Header = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between w-full border-b-4 p-2">
      <h1 className="text-2xl font-serif font-bold antialiased p-1 transition-opacity hover:opacity-70">
        <a href="/">Payments Remember</a>
      </h1>
      <nav>
        <ul className="flex flex-wrap gap-4 items-center justify-center">
          <li>
            <a
              className="font-serif text-base p-1 antialiased transition-opacity hover:opacity-70"
              href="#product"
            >
              Product
            </a>
          </li>
          <li>
            <a
              className="flex flex-wrap gap-2 items-center justify-center font-serif text-base p-4 font-bold antialiased bg-indigo-500 
              border-solid rounded transition-opacity hover:opacity-70"
              href="/login"
            >
              Login
              <Door size={25} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
