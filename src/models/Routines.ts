import { types, destroy, detach, clone } from "mobx-state-tree";
import { Trigger, TriggerType } from "./Triggers";
import { Action, ActionType } from "./Actions";
import createID from "./createID";

export const Routine = types
  .model({
    id: types.optional(types.string, () => createID()),
    name: types.string,
    enabled: false,
    requireApproval: false,
    queue: false,
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
    toggleRequireApproval() {
      self.requireApproval = !self.requireApproval;
    },
    toggleQueue() {
      self.queue = !self.queue;
    },
    createTrigger() {
      self.triggers.push(Trigger.create({ type: TriggerType.EMPTY }));
    },
    createAction() {
      self.actions.push(Action.create({ type: ActionType.EMPTY }));
    },
    deleteTrigger(trigger: any) {
      destroy(trigger);
    },
    deleteAction(action: any) {
      destroy(action);
    },
    duplicateAction(action: any) {
      self.actions.push(clone(action));
    },
    reorderAction(fromIndex: number, toIndex: number) {
      const action = self.actions[fromIndex];
      detach(action);
      self.actions.splice(toIndex, 0, action);
    },
  }))
  .views((self) => ({
    get isComplete() {
      return self.triggers.length && self.actions.length;
    },
    get subtitle() {
      return `${self.triggers.length} triggers, ${self.actions.length} actions`;
    },
    get variables() {
      return [
        ...new Set(
          self.triggers.reduce((vars, trigger) => {
            if (trigger.config) {
              vars.push(...trigger.config.variables);
            }
            return vars;
          }, [] as string[])
        ),
      ];
    },
  }));

export const Routines = types
  .model({
    items: types.optional(types.array(Routine), []),
  })
  .actions((self) => ({
    createRoutine() {
      self.items.push(
        Routine.create({
          name: "New Routine",
        })
      );
    },
    deleteRoutine(routine: any) {
      destroy(routine);
    },
  }));
