import React from "react";
import find from "local-devices";
import OBSWebSocket from "obs-websocket-js";
import BaseAction, { BaseActionProps } from "./BaseAction";
import useAction from "./useAction";
import resolveString from "../../../utils/resolveString";
import getVariables from "../../../utils/getVariables";
import { rootStore } from "../../../../models";

async function connect() {
  let location = "localhost";
  if (rootStore.settings.computerNames().length) {
    const devices = await find();
    const device = devices.find((device) =>
      rootStore.settings.computerNames().includes(device.name)
    );
    if (!device) {
      throw new Error("Could not find streaming PC on network.");
    }
    location = device.ip;
  }
  const obs = new OBSWebSocket();
  await obs.connect({ address: `${location}:4444` });
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
    const obs = await connectionPromise;
    await obs.send(action.config.name, obsArgs);
  });

  return (
    <BaseAction title="OBS" subtitle={action.config.name}>
      <div className="font-mono">{action.config.arguments}</div>
    </BaseAction>
  );
}
