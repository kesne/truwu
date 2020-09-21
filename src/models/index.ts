import { applySnapshot, Instance, onSnapshot } from "mobx-state-tree";
import Store from "electron-store";
import { RootModel } from "./Root";
import is from "electron-is";

const STORAGE_KEY = "truwu-v2" as const;

const store = new Store({
  defaults: {
    [STORAGE_KEY]: {
      settings: {},
      routines: { items: [{ name: "Test Routine" }] },
    },
  },
  watch: true,
});

export const rootStore = RootModel.create(store.get(STORAGE_KEY));
export type RootInstance = Instance<typeof RootModel>;

if (is.main()) {
  store.onDidChange(STORAGE_KEY, (snapshot) => {
    applySnapshot(rootStore, snapshot);
  });
} else {
  onSnapshot(rootStore, (snapshot) => {
    console.log("Snapshot: ", snapshot);
    store.set(STORAGE_KEY, snapshot);
    console.log("Snapshot persisted to storage.");
  });
}
