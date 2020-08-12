import React, { useContext, createContext, useEffect, useState } from "react";
import { Instance, onSnapshot, applySnapshot } from "mobx-state-tree";
import localForage from "localforage";
import { RootModel } from "./Root";

export const rootStore = RootModel.create({
  settings: {},
  routines: { items: [{ name: "Test Routine" }] },
});

const STORAGE_KEY = "truwu-v2";

onSnapshot(rootStore, async (snapshot) => {
  console.log("Snapshot: ", snapshot);
  await localForage.setItem(STORAGE_KEY, snapshot);
  console.log("Snapshot persisted to storage.");
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export function Provider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    localForage.getItem(STORAGE_KEY, (_err, data) => {
      if (data) {
        console.log("Hydrating store from snapshot", data);
        applySnapshot(rootStore, data);
      }

      setLoaded(true);
    });
  }, []);

  if (!loaded) return null;

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
}

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
