import { types } from "mobx-state-tree";
import { Trigger, TriggerType } from "./Triggers";

const Action = types.model({
  type: "",
  config: types.frozen(),
});

const Routine = types
  .model({
    name: types.string,
    enabled: false,
    triggers: types.optional(types.array(Trigger), []),
    actions: types.optional(types.array(Action), []),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    toggleEnabled() {
      self.enabled = !self.enabled;
    },
    createTrigger() {
      self.triggers.push({ type: TriggerType.EMPTY });
    },
    createAction() {
      self.actions.push({});
    },
  }))
  .views((self) => ({
    get isComplete() {
      return self.triggers.length && self.actions.length;
    },
    get subtitle() {
      return "Triggered via IDK";
    },
  }));

export const Routines = types
  .model({
    items: types.optional(types.array(Routine), []),
  })
  .actions((self) => ({
    createRoutine() {
      self.items.push({
        name: "Your Routine",
      });
    },
  }));
