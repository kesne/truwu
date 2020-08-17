import React from "react";
import say from "say";
import BaseAction, { BaseActionProps } from "./BaseAction";
import useAction from "./useAction";
import getVariables from "../../../utils/getVariables";
import resolveString from "../../../utils/resolveString";

export default function TTS({ routineTrigger, action }: BaseActionProps) {
  const message = resolveString(
    action.config.message,
    getVariables(routineTrigger.event.data)
  );

  useAction(
    () =>
      new Promise((resolve) =>
        say.speak(message, undefined, undefined, resolve)
      )
  );

  return <BaseAction title="Text To Speech">{message}</BaseAction>;
}
