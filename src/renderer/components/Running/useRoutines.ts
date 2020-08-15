import { useState, useCallback } from "react";
import { getSnapshot, SnapshotOut } from "mobx-state-tree";
import useQuirkConnection from "./useQuirkConnection";
import { useMst } from "../../models";
import { Routine } from "../../models/Routines";
import getMatchingRoutines from "../../utils/getMatchingRoutines";
import createID from "../../utils/createID";

export type RoutineTrigger = {
  id: string;
  routine: SnapshotOut<typeof Routine>;
  event: Record<string, any>;
};

export default function useRoutines() {
  const store = useMst();
  const [routines, setRoutines] = useState<RoutineTrigger[]>([]);

  const completeRoutine = useCallback(
    (id: string) => {
      setRoutines((previous) =>
        previous.filter((routineTrigger) => routineTrigger.id !== id)
      );
    },
    [setRoutines]
  );

  useQuirkConnection(store.settings.quirkAPIKey, (event) => {
    const snapshot = getSnapshot(store);
    const matchingRoutines = getMatchingRoutines(
      snapshot.routines.items,
      event
    );

    setRoutines((previous) => [
      ...previous,
      ...matchingRoutines.map((routine) => ({
        id: createID(),
        routine,
        event,
      })),
    ]);
  });

  return [routines, completeRoutine] as const;
}
