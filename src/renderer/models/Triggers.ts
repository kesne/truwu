import { types, getParent } from "mobx-state-tree";
import { Routine } from "./Routines";
import { createLiteral } from "./utils";

export enum TriggerType {
  EMPTY = "EMPTY",
  CHEER = "CHEER",
  FOLLOW = "FOLLOW",
  SUBSCRIPTION = "SUBSCRIPTION",
  CHANNEL_POINTS = "CHANNEL_POINTS",
}

export const CheerTriggerConfig = types
  .model({
    type: createLiteral(TriggerType.CHEER),
    variables: types.frozen(["bits", "username"]),
    condition: '',
  })
  .actions((self) => ({
    setCondition(condition: string) {
      self.condition = condition;
    },
  }));

export const ChannelPointsTriggerConfig = types
  .model({
    type: createLiteral(TriggerType.CHANNEL_POINTS),
    variables: types.frozen(["rewardMessage", "username"]),
    name: "",
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

const ConfigTypes = {
  [TriggerType.CHEER]: CheerTriggerConfig,
  [TriggerType.CHANNEL_POINTS]: ChannelPointsTriggerConfig,
};

export const Trigger = types
  .model({
    type: types.enumeration(Object.keys(TriggerType)),
    config: types.optional(
      types.maybeNull(types.union(...Object.values(ConfigTypes))),
      null
    ),
  })
  .actions((self) => ({
    delete() {
      const routine = getParent<typeof Routine>(getParent(self));
      routine.deleteTrigger(self);
    },
    setType(type: TriggerType) {
      self.type = type;

      if (type in ConfigTypes) {
        // @ts-ignore: TypeScript is wrong sometimes
        self.config = ConfigTypes[type].create({});
      } else {
        self.config = null;
      }
    },
  }));
