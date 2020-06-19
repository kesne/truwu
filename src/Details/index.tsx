import React from "react";
import Enabled from "./Enabled";
import Header from "../Header";

const item = {
  name: "Hype Train",
  triggers: [],
  actions: [],
};

export default function Details() {
  return (
    <div className="divide-y">
      <Header title={item.name} />

      <div className="p-6">
        <div className="space-y-6">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Name
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                autoComplete="off"
                className="form-input block w-full sm:text-sm sm:leading-5"
                value={item.name}
              />
            </div>
          </label>
          <div>
            <Enabled enabled onChange={() => {}} />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Triggers</div>
          <button className="rounded-full border-2 border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white transition-colors focus:outline-none duration-300 text px-4 py-2 font-semibold">
            Create
          </button>
        </div>
        <p>Control which events cause this routine to fire.</p>
        {item.triggers.length ? (
          <div>list</div>
        ) : (
          <div className="text-gray-500 text-center p-10">
            Create a trigger to get started...
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Actions</div>
          <button className="rounded-full border-2 border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white transition-colors focus:outline-none duration-300 text px-4 py-2 font-semibold">
            Create
          </button>
        </div>
        <p>Define what happens when this routine is triggered.</p>
        {item.triggers.length ? (
          <div>list</div>
        ) : (
          <div className="text-gray-500 text-center p-10">
            Create a trigger to get started...
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Test Routine</div>
        </div>
        <p>TODO: Allow us to test the routine.</p>
      </div>
    </div>
  );
}
