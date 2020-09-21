import { SnapshotOut } from "mobx-state-tree";
import { Routine } from "../../models/Routines";
import { TriggerType } from "../../models/Triggers";
import getVariables from "./getVariables";
import resolveBoolean from "./resolveBoolean";

export default function getMatchingRoutines(
  routines: SnapshotOut<typeof Routine>[],
  event: any
) {
  return routines.filter((routine) => {
    if (
      // Bai if not enabled:
      !routine.enabled ||
      // Bail if nothing has been configured:
      !routine.triggers.length ||
      !routine.actions.length
    ) {
      return false;
    }

    return routine.triggers.some((trigger) => {
      if (
        trigger.type === TriggerType.CHANNEL_POINTS &&
        event.type === "TWITCH_CHANNEL_REWARD" &&
        trigger.config.name === event.data.redemption.reward.title
      ) {
        return true;
      }

      if (
        trigger.type === TriggerType.CHEER &&
        event.type === "TWITCH_CHEER" &&
        resolveBoolean(trigger.config.condition, getVariables(event.data))
      ) {
        return true;
      }

      return false;
    });
  });
}
