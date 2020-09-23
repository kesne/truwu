import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../Header";
import { useMst } from "../MSTContext";
import Toggle from "./Toggle";

export default observer(() => {
  const store = useMst();

  return (
    <>
      <Header title="Settings" />
      <div className="divide-y">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">Quirk API Key</div>
          </div>
          <p>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                className="form-input block w-full sm:text-sm sm:leading-5"
                placeholder="Key..."
                type="password"
                value={store.settings.quirkAPIKey}
                onChange={(e) => store.settings.setQuirkAPIKey(e.target.value)}
              />
            </div>
          </p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">DMX Address</div>
          </div>
          <p>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                className="form-input block w-full sm:text-sm sm:leading-5"
                placeholder="Address..."
                type="text"
                value={store.settings.dmxAddress}
                onChange={(e) => store.settings.setDMXAddress(e.target.value)}
              />
            </div>
          </p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">OBS Computer Name</div>
          </div>
          <p>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                className="form-input block w-full sm:text-sm sm:leading-5"
                placeholder="Computer names..."
                type="text"
                value={store.settings.obsComputerName}
                onChange={(e) =>
                  store.settings.setOBSComputerName(e.target.value)
                }
              />
            </div>
          </p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">Auto-Connect On Launch</div>
            <Toggle
              checked={store.settings.autoStart}
              onClick={store.settings.toggleAutoStart}
            />
          </div>
        </div>
      </div>
    </>
  );
});
