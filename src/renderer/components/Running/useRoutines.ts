import { useState } from "react";
import { getSnapshot, SnapshotOut } from "mobx-state-tree";
import useQuirkConnection from "./useQuirkConnection";
import { useMst } from "../../models";
import { Routine } from "../../models/Routines";
import getMatchingRoutines from "../../utils/getMatchingRoutines";

export default function useRoutines() {
  const store = useMst();
  const [routines, setRoutines] = useState<SnapshotOut<typeof Routine>[]>([]);

  useQuirkConnection(store.settings.quirkAPIKey, (event) => {
    const snapshot = getSnapshot(store);
    const matchingRoutines = getMatchingRoutines(snapshot.routines.items, event);
    console.log({ matchingRoutines });
    setRoutines((previous) => [...previous, ...matchingRoutines]);
  });

  return routines;
}
