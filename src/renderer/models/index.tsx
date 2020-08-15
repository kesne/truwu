import React, { useContext, createContext, useEffect, useState } from "react";
import { Instance, onSnapshot, applySnapshot } from "mobx-state-tree";
import Store from "electron-store";
import { RootModel } from "./Root";

const store = new Store();

export const rootStore = RootModel.create({
  settings: {},
  routines: { items: [{ name: "Test Routine" }] },
});

const STORAGE_KEY = "truwu-v2";

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  store.set(STORAGE_KEY, snapshot);
  console.log("Snapshot persisted to storage.");
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export function Provider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = store.get(STORAGE_KEY);
    if (data) {
      console.log("Hydrating store from snapshot", data);
      applySnapshot(rootStore, data);
    }

    setLoaded(true);
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
