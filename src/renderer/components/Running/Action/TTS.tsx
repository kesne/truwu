import React from "react";
import say from "say";
import BaseAction, { BaseActionProps } from "./BaseAction";
import useAction from "./useAction";
import getVariables from "../../../utils/getVariables";
import resolveString from "../../../utils/resolveString";

var obj = {
  "data": {
    "channel": "#vapejuicejordan",
    "message": "ShowLove1 o hi ur very cute",
    "userstate": {
      "badge-info": {
        "subscriber": "3"
      },
      "badges": {
        "moderator": "1",
        "subscriber": "0",
        "hype-train": "1"
      },
      "bits": "1",
      "color": "#FF69B4",
      "display-name": "mewtru",
      "emotes": null,
      "flags": null,
      "id": "7aefe4a9-9914-4e86-bd83-595ae42c7b84",
      "mod": true,
      "room-id": "452849164",
      "subscriber": true,
      "tmi-sent-ts": "1597450901875",
      "turbo": false,
      "user-id": "85895099",
      "user-type": "mod",
      "emotes-raw": null,
      "badge-info-raw": "subscriber/3",
      "badges-raw": "moderator/1,subscriber/0,hype-train/1",
      "username": "mewtru"
    }
  },
  "type": "TWITCH_CHEER"
}

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
