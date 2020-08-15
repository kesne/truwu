import { useEffect, useContext } from "react";
import { ActionContext } from "./BaseAction";

export default function useAction(action: () => Promise<any>) {
  const actionContext = useContext(ActionContext);

  if (!actionContext) {
    throw new Error("Something bad happened");
  }

  useEffect(() => {
    if (actionContext.state === "running") {
      action().then(actionContext.onDone, actionContext.onDone);
    }
  }, [actionContext.state]);
}
