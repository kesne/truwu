import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../Header";
import { useMst } from "../../models";

export default observer(() => {
  const store = useMst();

  return (
    <div className="divide-y">
      <Header title="Settings" />
      {/* <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Test Routine</div>
        </div>
        <p>TODO: Allow us to test the routine.</p>
      </div> */}
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
    </div>
  );
});
