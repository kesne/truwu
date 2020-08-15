import React from "react";
import BaseAction, { BaseActionProps } from "./BaseAction";
import useAction from "./useAction";
import resolveString from "../../../utils/resolveString";
import getVariables from "../../../utils/getVariables";

export default function SendMessage({
  action,
  routineTrigger,
}: BaseActionProps) {
  const message = resolveString(
    action.config.message,
    getVariables(routineTrigger.event.data)
  );

  useAction(async () => {
    console.log("todo send message to twitch", message);
  });

  return <BaseAction title="Send Message">{message}</BaseAction>;
}
