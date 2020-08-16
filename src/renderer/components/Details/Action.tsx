import React from "react";
import { Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import ReactJson from "react-json-view";
import {
  Action,
  ActionType,
  DelayActionConfig,
  DMXActionConfig,
  TTSActionConfig,
  OBSActionConfig,
  ModifyVariableActionConfig,
} from "../../models/Actions";

const DelayConfig = observer(
  ({ config }: { config: Instance<typeof DelayActionConfig> }) => (
    <label className="block text-sm font-medium leading-5 text-gray-700">
      Amount
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          autoComplete="off"
          className="form-input block w-full sm:text-sm sm:leading-5"
          value={config.amount}
          onChange={(e) => config.setAmount(e.target.value)}
        />
      </div>
    </label>
  )
);

const TTSConfig = observer(
  ({ config }: { config: Instance<typeof TTSActionConfig> }) => (
    <label className="block text-sm font-medium leading-5 text-gray-700">
      Message
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          autoComplete="off"
          className="form-input block w-full sm:text-sm sm:leading-5"
          value={config.message}
          onChange={(e) => config.setMessage(e.target.value)}
        />
      </div>
    </label>
  )
);

const OBSConfig = observer(
  ({ config }: { config: Instance<typeof OBSActionConfig> }) => (
    <>
      <label className="block text-sm font-medium leading-5 text-gray-700">
        Request Name
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            autoComplete="off"
            className="form-input block w-full sm:text-sm sm:leading-5"
            value={config.name}
            onChange={(e) => config.setName(e.target.value)}
          />
        </div>
      </label>
      <label className="block text-sm font-medium leading-5 text-gray-700">
        Arguments
        <div className="mt-1 relative rounded-md shadow-sm">
          <ReactJson
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            name={false}
            onEdit={(val) => {
              config.setArguments(JSON.stringify(val.updated_src));
            }}
            onAdd={(val) => {
              config.setArguments(JSON.stringify(val.updated_src));
            }}
            onDelete={(val) => {
              config.setArguments(JSON.stringify(val.updated_src));
            }}
            src={JSON.parse(config.arguments || "{}") || {}}
          />
        </div>
      </label>
    </>
  )
);

const ModifyVariableConfig = observer(
  ({ config }: { config: Instance<typeof ModifyVariableActionConfig> }) => (
    <>
      <label className="block text-sm font-medium leading-5 text-gray-700">
        Variable Name (with the $)
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            autoComplete="off"
            className="form-input block w-full sm:text-sm sm:leading-5"
            value={config.name}
            onChange={(e) => config.setName(e.target.value)}
          />
        </div>
      </label>
      <label className="block text-sm font-medium leading-5 text-gray-700">
        Modification
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            autoComplete="off"
            className="form-input block w-full sm:text-sm sm:leading-5"
            value={config.modification}
            onChange={(e) => config.setModification(e.target.value)}
          />
        </div>
      </label>
      <label className="block text-sm leading-5 font-medium text-gray-700">
        Resolve As
        <select
          value={config.resolveAs}
          onChange={(e) => {
            const value = e.target.value as "string" | "number";
            config.setResolveAs(value);
          }}
          className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        >
          <option value="string">String</option>
          <option value="number">Number</option>
        </select>
      </label>
    </>
  )
);

const DMXConfig = observer(
  ({ config }: { config: Instance<typeof DMXActionConfig> }) => (
    <div className="flex items-end space-x-4">
      <div className="flex-1 space-y-2">
        {config.items.map((item, i) => (
          <div key={i} className="flex space-x-4 items-end">
            <label className="flex-1 block text-sm font-medium leading-5 text-gray-700">
              Channel
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  autoComplete="off"
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  value={item.channel}
                  onChange={(e) => item.setChannel(e.target.value)}
                />
              </div>
            </label>
            <label className="flex-1 block text-sm font-medium leading-5 text-gray-700">
              Value
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  autoComplete="off"
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  value={item.value}
                  onChange={(e) => item.setValue(e.target.value)}
                />
              </div>
            </label>
            {config.items.length !== 1 && (
              <div>
                <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-red-700 bg-red-100 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 hover:bg-red-200 transition ease-in-out duration-150"
                  onClick={() => config.deleteItem(i)}
                  disabled={config.items.length === 1}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="trash w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
          onClick={config.addItem}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="plus w-6 h-6">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
);

const ActionConfig = {
  [ActionType.DELAY]: DelayConfig,
  [ActionType.DMX]: DMXConfig,
  [ActionType.TTS]: TTSConfig,
  [ActionType.OBS]: OBSConfig,
  [ActionType.MODIFY_VARIABLE]: ModifyVariableConfig,
};

type Props = {
  action: Instance<typeof Action>;
};

export default observer(({ action }: Props) => {
  let ConfigComponent;
  if (action.type in ActionConfig) {
    // @ts-expect-error I hate TypeScript
    ConfigComponent = ActionConfig[action.type];
  }

  return (
    <div className="rounded-md p-4 bg-gray-100 space-y-4">
      <label className="block text-sm leading-5 font-medium text-gray-700">
        Action Type
        <select
          value={action.type}
          onChange={(e) => {
            const value = e.target.value as ActionType;
            action.setType(value);
          }}
          className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        >
          <option disabled value={ActionType.EMPTY}>
            Select an action...
          </option>
          <option value={ActionType.SOUND} disabled>
            Play Sound File
          </option>
          <option value={ActionType.SPOTIFY} disabled>
            Play Song on Spotify
          </option>
          <option value={ActionType.LIFX} disabled>
            Change Light Color
          </option>
          <option value={ActionType.DMX}>DMX Control</option>
          <option value={ActionType.DELAY}>Delay</option>
          <option value={ActionType.TTS}>Text To Speech</option>
          <option value={ActionType.OBS}>OBS Control</option>
          <option value={ActionType.MODIFY_VARIABLE}>Modify Global Variable</option>
        </select>
      </label>
      {ConfigComponent && <ConfigComponent config={action.config} />}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
          onClick={action.duplicate}
        >
          Duplicate
        </button>
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:border-red-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
          onClick={action.delete}
        >
          Delete
        </button>
      </div>
    </div>
  );
});
