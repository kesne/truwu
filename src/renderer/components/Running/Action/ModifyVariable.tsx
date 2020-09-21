import React from "react";
import BaseAction, { BaseActionProps } from "./BaseAction";
import useAction from "./useAction";
import getVariables, { globalVariables } from "../../../utils/getVariables";
import resolveString from "../../../utils/resolveString";
import resolveNumber from "../../../utils/resolveNumber";

export default function ModifyVariable({
  action,
  routineTrigger,
}: BaseActionProps) {
  useAction(async () => {
    const variables = getVariables(routineTrigger.event.data);

    globalVariables[action.config.name] =
      action.config.resolveAs === "string"
        ? resolveString(action.config.modification, variables)
        : resolveNumber(action.config.modification, variables);
  });

  return (
    <BaseAction title="Modify Variable" subtitle={action.config.name}>
      <div className="font-mono">{action.config.modification}</div>
    </BaseAction>
  );
}
