import { createContext, useContext } from "react";
import { SnapshotOut } from "mobx-state-tree";
import { Routine } from "../../models/Routines";
import queue from "queue";

export const QueueContext = createContext(new Map<string, queue>());

export function useQueue(routine: SnapshotOut<typeof Routine>) {
  const map = useContext(QueueContext);

  if (!map.get(routine.id)) {
    map.set(routine.id, queue({ autostart: true, concurrency: 1 }));
  }

  return map.get(routine.id)!;
}
