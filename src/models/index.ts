import { useContext, createContext } from "react";
import { Instance, onSnapshot } from "mobx-state-tree";
import { RootModel } from "./Root";

export const rootStore = RootModel.create({
  settings: {},
  routines: { items: [{ name: "Test Routine" }] },
});

onSnapshot(rootStore, (snapshot) => console.log("Snapshot: ", snapshot));

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
