import React from "react";
import ListItem from "./ListeItem";

export default function App() {
  return (
    <>
      <div className="p-6 flex justify-between items-center border-b">
        <h1 className="text-2xl font-semibold text-indigo-600">Truwu</h1>
        <button className="rounded-full border-2 border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white transition-colors focus:outline-none duration-300 flex text-lg px-4 py-2 items-center justify-center font-semibold">
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mr-2"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>
          Create
        </button>
      </div>
      <div>
        <ul className="divide-y divide-gray-200">
          <ListItem title="Jump Scare" subtitle="Triggered via Bits" active />
          <ListItem
            title="Hype Train Lights"
            subtitle="Triggered via Hype Train"
          />
        </ul>
      </div>
    </>
  );
}
