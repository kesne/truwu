import { SnapshotOut } from "mobx-state-tree";
import { Routine } from "../models/Routines";
import { TriggerType } from "../models/Triggers";

export default function getMatchingRoutines(
  routines: SnapshotOut<typeof Routine>[],
  event: any
) {
  return routines.filter((routine) =>
    routine.triggers.some((trigger) => {
      console.log("Checking trigger...", { event, trigger });
      if (
        trigger.type === TriggerType.CHANNEL_POINTS &&
        event.type === "TWITCH_CHANNEL_REWARD" &&
        trigger.config.name === event.data.redemption.reward.title
      ) {
        return true;
      }

      return false;
    })
  );
}
