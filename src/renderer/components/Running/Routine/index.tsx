import React, { useState, useEffect, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { RoutineTrigger } from "../useRoutines";
import Action from "../Action";
import { ActionContext } from "../Action/BaseAction";
import { ipcRenderer } from "electron";
import say from "say";
import { useQueue } from "../Queue";

type Props = {
  routineTrigger: RoutineTrigger;
  onDone(): void;
};

function Stop() {
  return (
    <button className="text-red-400 hover:text-red-600 transition duration-150">
      <svg viewBox="0 0 20 20" fill="currentColor" className="x-circle w-6 h-6">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

function Approval({
  onDeny,
  onApprove,
}: {
  onDeny(): void;
  onApprove(): void;
}) {
  return (
    <div className="flex space-x-1">
      <button onClick={onDeny}>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="minus-circle w-6 h-6 text-red-500 hover:text-red-600 transition duration-300"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button onClick={onApprove}>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="check-circle w-6 h-6 text-green-500 hover:text-green-600 transition duration-300"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

function getInitialIndex(routineTrigger: RoutineTrigger) {
  let initial = 0;

  if (routineTrigger.routine.requireApproval) {
    initial--;
  }
  if (routineTrigger.routine.queue) {
    initial--;
  }

  return initial;
}

export default function Routine({ routineTrigger, onDone }: Props) {
  const [actionIndex, setActionIndex] = useState(
    getInitialIndex(routineTrigger)
  );

  const incr = () => setActionIndex((index) => index + 1);

  const finish = useRef<any>();
  if (!finish.current) {
    let resolve: () => void;
    const promise = new Promise((innerResolve) => resolve = innerResolve);
    finish.current = {
      promise,
      onDone() {
        resolve();
        onDone();
      }
    };
  }

  const queue = useQueue(routineTrigger.routine);
  useEffect(() => {
    if (routineTrigger.routine.queue) {
      queue.push(() => {
        incr();
        return finish.current.promise;
      });
    }
  }, []);

  useEffect(() => {
    if (routineTrigger.routine.requireApproval) {
      say.speak("LOOK AT true woo BITCH");
      ipcRenderer.send("notify");
    }
  }, []);

  useEffect(() => {
    if (actionIndex === routineTrigger.routine.actions.length) {
      finish.current.onDone();
    }
  }, [actionIndex]);

  return (
    <motion.li
      layout
      className="bg-white rounded shadow mx-2 p-3"
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -150, opacity: 0 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-gray-900 font-medium text-lg">
            {routineTrigger.routine.name}
          </div>
        </div>
        {routineTrigger.routine.requireApproval && actionIndex < 0 && (
          <Approval onDeny={() => finish.current.onDone()} onApprove={incr} />
        )}
      </div>
      <div className="mt-2 space-y-2">
        {routineTrigger.routine.actions.map((action, index) => (
          <ActionContext.Provider
            value={{
              state:
                index < actionIndex
                  ? "complete"
                  : index > actionIndex
                  ? "pending"
                  : "running",
              onDone: incr,
            }}
          >
            <Action
              key={index}
              action={action}
              routineTrigger={routineTrigger}
            />
          </ActionContext.Provider>
        ))}
      </div>
    </motion.li>
  );
}
