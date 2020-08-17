import React from "react";
import find from "local-devices";
import OBSWebSocket from "obs-websocket-js";
import BaseAction, { BaseActionProps } from "./BaseAction";
import useAction from "./useAction";
import resolveString from "../../../utils/resolveString";
import getVariables from "../../../utils/getVariables";

// TODO: Configure this in settings
// These are the names that my streaming PC (which runs OBS) has existed under
const STREAM_PC_NAMES = [
  "gaming-desktop-nzxt.localdomain",
  "vjj-streaming-pc.localdomain",
];

async function connect() {
  const devices = await find();
  const device = devices.find((device) =>
    STREAM_PC_NAMES.includes(device.name)
  );
  if (!device) {
    throw new Error("Could not find streaming PC on network.");
  }
  const obs = new OBSWebSocket();
  await obs.connect({ address: `${device.ip}:4444` });
  return obs;
}

let connectionPromise = connect();

// TODO: This needs to be better, but it's fine for now.
function deepNumberConversion(obj: any) {
  Object.entries(obj).forEach(([key, value]: any) => {
    if (typeof value === "string" && !Number.isNaN(+value)) {
      obj[key] = +value;
    }
    if (typeof value === "object" && !Number.isNaN(value)) {
      deepNumberConversion(value);
    }
  });

  return obj;
}

export default function OBS({ action, routineTrigger }: BaseActionProps) {
  useAction(async () => {
    const obsArgs = deepNumberConversion(
      JSON.parse(
        resolveString(
          action.config.arguments,
          getVariables(routineTrigger.event.data)
        )
      )
    );
    console.log(obsArgs);
    const obs = await connectionPromise;
    await obs.send(action.config.name, obsArgs);
  });

  return (
    <BaseAction title="OBS" subtitle={action.config.name}>
      <div className="font-mono">{action.config.arguments}</div>
    </BaseAction>
  );
}
