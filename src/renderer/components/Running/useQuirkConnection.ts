import { useEffect, useState } from "react";
import axios from "axios";
import nodeAdapter from "axios/lib/adapters/http";

const QUIRK_DOMAIN = "websocket.quirk.gg";

export default function useQuirkConnection(
  apiKey: string,
  onMessage: (event: Record<string, any>) => void
) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (connected) return;

    let websocket: WebSocket;
    const source = axios.CancelToken.source();

    (async () => {
      const response = await axios.post<{ access_token: string }>(
        `https://${QUIRK_DOMAIN}/token`,
        {
          access_token: apiKey,
        },
        {
          adapter: nodeAdapter,
          cancelToken: source.token,
        }
      );

      websocket = new WebSocket(
        `wss://${QUIRK_DOMAIN}?access_token=${response.data.access_token}`
      );

      websocket.addEventListener("open", () => console.log("Connected to Quirk"));
      websocket.addEventListener("error", () => {
        setConnected(false);
      });
      websocket.addEventListener("message", (event) => {
        onMessage(JSON.parse(event.data));
      });
      websocket.addEventListener("close", () => {
        setConnected(false);
      });
    })();

    return () => {
      source.cancel();

      if (websocket) {
        websocket.close();
      }
    };
  }, [apiKey, connected]);
}
