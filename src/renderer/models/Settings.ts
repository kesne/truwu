import { types } from "mobx-state-tree";

export const Settings = types
  .model({
    quirkAPIKey: "",
    lifxAPIKey: "",
  })
  .actions((self) => ({
    setQuirkAPIKey(value: string) {
      self.quirkAPIKey = value;
    },
    setLifxAPIKey(value: string) {
      self.lifxAPIKey = value;
    },
  }));
