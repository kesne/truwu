import React from "react";

export default function Action() {
  return (
    <div>
      <div>
        <label className="block text-sm leading-5 font-medium text-gray-700">
          Action Type
          <select className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
            <option disabled value=""></option>
            <option>Play Sound File</option>
            <option>Play Song on Spotify</option>
            <option disabled>Change Light Color</option>
          </select>
        </label>
      </div>
    </div>
  );
}
