import { types, getParent } from "mobx-state-tree";
import { Routine } from "./Routines";
import { createLiteral, createVariable, VariableValue } from "./utils";

export enum ActionType {
  EMPTY = "EMPTY",
  DELAY = "DELAY",
  SOUND = "SOUND",
  SPOTIFY = "SPOTIFY",
  DMX = "DMX",
  LIFX = "LIFX",
  SEND_MESSAGE = "SEND_MESSAGE",
  TTS = "TTS",
  OBS = "OBS",
}

export const DelayActionConfig = types
  .model({
    type: createLiteral(ActionType.DELAY),
    amount: createVariable(1000),
  })
  .actions((self) => ({
    setAmount(amount: VariableValue) {
      self.amount = amount;
    },
  }));

export const DMXActionConfig = types
  .model({
    type: createLiteral(ActionType.DMX),
    items: types.optional(
      types.array(
        types
          .model({
            channel: createVariable(1),
            value: createVariable(0),
          })
          .actions((self) => ({
            setChannel(channel: VariableValue) {
              self.channel = channel;
            },
            setValue(value: VariableValue) {
              self.value = value;
            },
          }))
      ),
      [{}]
    ),
  })
  .actions((self) => ({
    addItem() {
      self.items.push({});
    },

    deleteItem(index: number) {
      self.items.splice(index, 1);
    },
  }));

const ConfigTypes = {
  [ActionType.DELAY]: DelayActionConfig,
  [ActionType.DMX]: DMXActionConfig,
};

export const Action = types
  .model({
    type: types.enumeration(Object.keys(ActionType)),
    config: types.optional(
      types.maybeNull(types.union(...Object.values(ConfigTypes))),
      null
    ),
  })
  .actions((self) => ({
    delete() {
      const routine = getParent<typeof Routine>(getParent(self));
      routine.deleteAction(self);
    },
    setType(type: ActionType) {
      self.type = type;

      if (type in ConfigTypes) {
        self.config = ConfigTypes[type].create({});
      } else {
        self.config = null;
      }
    },
  }));
