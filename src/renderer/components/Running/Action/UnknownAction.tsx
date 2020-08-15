import React from "react";
import BaseAction, { BaseActionProps } from "./BaseAction";
import useAction from "./useAction";

export default function UnknownAction({}: BaseActionProps) {
  useAction(async () => {});

  return <BaseAction title="???" />;
}
