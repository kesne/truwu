import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import ListItem from "./ListItem";
import Header from "../Header";
import { useMst } from "../../models";

export default observer(() => {
  const store = useMst();

  const createRoutine = useCallback(() => {
    store.routines.createRoutine();
  }, [store]);

  return (
    <div className="divide-y">
      <Header
        title="Routines"
        action={
          <button
            onClick={createRoutine}
            className="rounded-full border-2 border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white transition-colors focus:outline-none duration-300 flex text-lg px-4 py-2 items-center justify-center font-semibold"
          >
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
        }
      />
      <div>
        <ul className="divide-y divide-gray-200">
          {store.routines.items.map((routine, i) => (
            <ListItem
              key={i}
              id={i}
              title={routine.name}
              subtitle={routine.subtitle}
              active={routine.enabled}
              incomplete={!routine.isComplete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
});
