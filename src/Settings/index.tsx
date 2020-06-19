import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

export default function Settings() {
  return (
    <div className="divide-y">
      <Header title="Settings" />
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Test Routine</div>
        </div>
        <p>TODO: Allow us to test the routine.</p>
      </div>
    </div>
  );
}
