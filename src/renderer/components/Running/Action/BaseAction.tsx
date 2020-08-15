import React, { createContext, useContext } from "react";
import clsx from "clsx";
import { RoutineTrigger } from "../useRoutines";
import { SnapshotOut } from "mobx-state-tree";
import { Action } from "../../../models/Actions";

type State = "pending" | "running" | "complete";

type Props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export type BaseActionProps = {
  action: SnapshotOut<typeof Action>;
  routineTrigger: RoutineTrigger;
};

export const ActionContext = createContext<null | {
  onDone(): void;
  state: State;
}>(null);

export default function BaseAction({ title, subtitle, children }: Props) {
  const actionContext = useContext(ActionContext);

  if (!actionContext) {
    throw new Error("Something bad happened");
  }

  return (
    <div
      className={clsx(
        "text-gray-700 rounded p-4 bg-gray-200",
        actionContext.state === "complete" && "opacity-50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {actionContext.state === "running" && (
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="arrow-circle-right w-5 h-5 text-blue-500 animate-pulse"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <div className="font-semibold">{title}</div>
          {subtitle && (
            <>
              <div className="text-gray-500">/</div>
              <div className="text-gray-500">{subtitle}</div>
            </>
          )}
        </div>
      </div>
      {children && <div className="text-gray-600">{children}</div>}
    </div>
  );
}
