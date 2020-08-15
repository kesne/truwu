import React from "react";
import BaseAction, { BaseActionProps } from "./BaseAction";
import useAction from "./useAction";
import { ipcRenderer } from "electron";
import sleep from "../../../utils/sleep";

export default function DMXComponent({ action }: BaseActionProps) {
  useAction(async () => {
    const updateValues: Record<number, number> = {};
    action.config.items.forEach((item: any) => {
      updateValues[item.channel] = Number(item.value);
    });
    ipcRenderer.send("dmx", updateValues);
    await sleep(200);
  });

  return (
    <BaseAction
      title="DMX"
      subtitle={action.config.items
        .map(({ channel, value }: any) => `${channel}: ${value}`)
        .join(", ")}
    />
  );
}
