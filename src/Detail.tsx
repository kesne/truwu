import React from "react";

export default function Detail() {
  return (
    <>
      <div className="p-6 border-b flex items-center">
        <button className="rounded-full p-2 hover:bg-gray-200 focus:outline-none transition-colors duration-150">
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 className="text-center text-2xl font-bold text-gray-900 flex-1">
          Hype Train
        </h1>
        {/* NOTE: This is used to visually balance the title */}
        <span className="w-6 h-6" />
      </div>
      <div className="p-6 border-b">
        <div className="space-y-6">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Name
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="email"
                className="form-input block w-full sm:text-sm sm:leading-5"
                placeholder="you@example.com"
              />
            </div>
          </label>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium leading-5 text-gray-700">
                Enabled
              </span>
              {/* On: "bg-indigo-600", Off: "bg-gray-200" */}
              <span
                role="checkbox"
                tabIndex={0}
                aria-checked="false"
                className="bg-gray-200 relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
              >
                {/* On: "translate-x-5", Off: "translate-x-0" */}
                <span
                  aria-hidden="true"
                  className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Triggers</div>
          <button className="rounded-full border-2 border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white transition-colors focus:outline-none duration-300 text px-4 py-2 font-semibold">
            Create
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Actions</div>
          <button className="rounded-full border-2 border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white transition-colors focus:outline-none duration-300 text px-4 py-2 font-semibold">
            Create
          </button>
        </div>
      </div>
    </>
  );
}
