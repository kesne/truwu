import React from "react";
import BaseAction, { BaseActionProps } from "./BaseAction";
import useAction from "./useAction";
import resolveNumber from "../../../utils/resolveNumber";
import sleep from "../../../utils/sleep";

export default function Delay({ action }: BaseActionProps) {
  const amount = resolveNumber(action.config.amount, {});

  useAction(() => sleep(amount));

  return <BaseAction title="Delay" subtitle={String(amount)} />;
}
