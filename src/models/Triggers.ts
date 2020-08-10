import { types } from "mobx-state-tree";

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
}

export const CheerTriggerConfig = types
  .model({
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

export const Trigger = types
  .model({
    type: types.enumeration(Object.keys(TriggerType)),
    config: types.optional(
      types.maybeNull(types.union(CheerTriggerConfig)),
      null
    ),
  })
  .actions((self) => ({
    setType(type: TriggerType) {
      self.type = type;

      switch (type) {
        case TriggerType.CHEER:
          self.config = CheerTriggerConfig.create({});
          break;
        default:
          self.config = null;
          break;
      }
    },
  }));
