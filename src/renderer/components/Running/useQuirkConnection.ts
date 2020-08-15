import { useEffect } from "react";
import axios from "axios";
import nodeAdapter from "axios/lib/adapters/http";

const QUIRK_DOMAIN = "websocket.quirk.gg";

export default function useQuirkConnection(
  apiKey: string,
  onMessage: (event: Record<string, any>) => void
) {
  useEffect(() => {
    let websocket: WebSocket;
    const source = axios.CancelToken.source();

    (async () => {
      const response = await axios.post<{ token: string }>(
        `https://${QUIRK_DOMAIN}/token`,
        {
          auth_token: apiKey,
        },
        {
          adapter: nodeAdapter,
          cancelToken: source.token,
        }
      );

      websocket = new WebSocket(
        `wss://${QUIRK_DOMAIN}?token=${response.data.token}`
      );

      websocket.addEventListener("open", () => console.log("connected"));
      websocket.addEventListener("error", console.log);
      websocket.addEventListener("message", (event) => {
        onMessage(JSON.parse(event.data));
      });
      websocket.addEventListener("close", console.log);
    })();

    return () => {
      source.cancel();

      if (websocket) {
        websocket.close();
      }
    };
  }, [apiKey]);
}
