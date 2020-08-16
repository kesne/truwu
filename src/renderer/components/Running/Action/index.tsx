import React from "react";
import { ActionType } from "../../../models/Actions";
import TTS from "./TTS";
import { BaseActionProps } from "./BaseAction";
import Delay from "./Delay";
import UnknownAction from "./UnknownAction";
import DMX from "./DMX";
import OBS from "./OBS";
import ModifyVariable from "./ModifyVariable";

const ActionComponents = {
  [ActionType.TTS]: TTS,
  [ActionType.DELAY]: Delay,
  [ActionType.DMX]: DMX,
  [ActionType.OBS]: OBS,
  [ActionType.MODIFY_VARIABLE]: ModifyVariable,
};

export default function Action(props: BaseActionProps) {
  const { action } = props;

  if (action.type in ActionComponents) {
    // @ts-expect-error: Whatever...
    const Component = ActionComponents[action.type];
    return <Component {...props} />;
  }

  return <UnknownAction {...props} />;
}
