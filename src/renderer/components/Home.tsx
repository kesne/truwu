import React from "react";
import { Link } from "react-router-dom";
import ActionsBar from "./ActionsBar";

export default function Home() {
  return (
    <div className="p-6 space-y-6 text-center min-h-screen flex flex-col">
      <h1 className="text-6xl font-bold text-gray-900">truwu</h1>
      <div className="flex-1 flex items-center justify-center">
        <Link
          to="running"
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none rounded-full"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="play w-32 h-32"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <ActionsBar />
    </div>
  );
}
