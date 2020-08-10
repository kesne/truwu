import React from "react";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import Header from "../Header";
import Enabled from "./Enabled";
import Trigger from "./Trigger";
import { useMst } from "../../models";

export default observer(() => {
  const params = useParams();
  const store = useMst();

  const routine = store.routines.items[parseInt(params.id, 10)];

  return (
    <div className="divide-y">
      <Header title={routine.name} />

      <div className="p-6">
        <div className="space-y-6">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Name
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                autoComplete="off"
                className="form-input block w-full sm:text-sm sm:leading-5"
                value={routine.name}
                onChange={(e) => routine.setName(e.target.value)}
              />
            </div>
          </label>
          <div>
            <Enabled
              enabled={routine.enabled}
              onChange={() => routine.toggleEnabled()}
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Triggers</div>
          <button onClick={routine.createTrigger} className="rounded-full border-2 border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white transition-colors focus:outline-none duration-300 text px-4 py-2 font-semibold">
            Add
          </button>
        </div>
        <p className="mb-2">Control which events cause this routine to fire.</p>
        {routine.triggers.map((trigger, i) => (
          <Trigger key={i} trigger={trigger} />
        ))}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Actions</div>
          <button onClick={routine.createAction} className="rounded-full border-2 border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white transition-colors focus:outline-none duration-300 text px-4 py-2 font-semibold">
            Add
          </button>
        </div>
        <p>Define what happens when this routine is triggered.</p>
        {routine.actions.map(() => (
          <div>Action here</div>
        ))}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Test Routine</div>
        </div>
        <p>TODO: Allow us to test the routine.</p>
      </div>
    </div>
  );
});
