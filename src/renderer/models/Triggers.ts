import { types, getParent } from "mobx-state-tree";
import { Routine } from "./Routines";
import { createLiteral } from "./utils";

export enum MatchCondition {
  EQUALS = "EQUALS",
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
}

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
    variables: types.frozen(["bits"]),
    amount: types.optional(types.maybeNull(types.number), null),
    matchCondition: types.optional(
      types.enumeration(Object.keys(MatchCondition)),
      MatchCondition.EQUALS
    ),
  })
  .actions((self) => ({
    setAmount(amount: number | null) {
      self.amount = amount;
    },
    setMatchCondition(condition: MatchCondition) {
      self.matchCondition = condition;
    },
  }));

export const ChannelPointsTriggerConfig = types
  .model({
    type: createLiteral(TriggerType.CHANNEL_POINTS),
    variables: types.frozen(["rewardMessage"]),
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
        self.config = ConfigTypes[type].create({});
      } else {
        self.config = null;
      }
    },
  }));
