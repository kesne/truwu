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
  MODIFY_VARIABLE = "MODIFY_VARIABLE",
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

export const ModifyVariableActionConfig = types
  .model({
    type: createLiteral(ActionType.MODIFY_VARIABLE),
    name: "",
    modification: "",
    resolveAs: types.optional(
      types.enumeration(["string", "number"]),
      "string"
    ),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    setModification(modification: string) {
      self.modification = modification;
    },
    setResolveAs(resolveAs: "string" | "number") {
      self.resolveAs = resolveAs;
    },
  }));

export const OBSActionConfig = types
  .model({
    type: createLiteral(ActionType.OBS),
    name: "",
    arguments: "",
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    setArguments(args: string) {
      self.arguments = args;
    },
  }));

export const TTSActionConfig = types
  .model({
    type: createLiteral(ActionType.TTS),
    message: "",
  })
  .actions((self) => ({
    setMessage(message: string) {
      self.message = message;
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
  [ActionType.TTS]: TTSActionConfig,
  [ActionType.OBS]: OBSActionConfig,
  [ActionType.MODIFY_VARIABLE]: ModifyVariableActionConfig,
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
    duplicate() {
      const routine = getParent<typeof Routine>(getParent(self));
      routine.duplicateAction(self);
    },
    setType(type: ActionType) {
      self.type = type;

      if (type in ConfigTypes) {
        // @ts-ignore: TypeScript is wrong sometimes:
        self.config = ConfigTypes[type].create({});
      } else {
        self.config = null;
      }
    },
  }));
