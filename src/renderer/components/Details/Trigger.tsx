import React from "react";
import { Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import {
  Trigger,
  TriggerType,
  CheerTriggerConfig,
  ChannelPointsTriggerConfig,
} from "../../models/Triggers";

// function Message() {
//   return (
//     <>
//       <label className="block text-sm font-medium leading-5 text-gray-700">
//         Only From User (optional)
//         <div className="mt-1 relative rounded-md shadow-sm">
//           <input
//             autoComplete="off"
//             className="form-input block w-full sm:text-sm sm:leading-5"
//           />
//         </div>
//       </label>
//       <label className="block text-sm font-medium leading-5 text-gray-700">
//         Message Matches
//         <div className="mt-1 relative rounded-md shadow-sm">
//           <input
//             autoComplete="off"
//             className="form-input block w-full sm:text-sm sm:leading-5"
//           />
//         </div>
//       </label>
//     </>
//   );
// }

const Cheer = observer(
  ({ config }: { config: Instance<typeof CheerTriggerConfig> }) => (
    <label className="block text-sm font-medium leading-5 text-gray-700">
      Condition
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          autoComplete="off"
          className="form-input block w-full sm:text-sm sm:leading-5"
          value={config.condition}
          onChange={(e) => config.setCondition(e.target.value)}
        />
      </div>
    </label>
  )
);

const ChannelPoints = observer(
  ({ config }: { config: Instance<typeof ChannelPointsTriggerConfig> }) => (
    <label className="block text-sm font-medium leading-5 text-gray-700">
      Name
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          autoComplete="off"
          className="form-input block w-full sm:text-sm sm:leading-5"
          value={config.name}
          onChange={(e) => config.setName(e.target.value)}
        />
      </div>
    </label>
  )
);

const TriggerConfig = {
  [TriggerType.CHEER]: Cheer,
  [TriggerType.CHANNEL_POINTS]: ChannelPoints,
};

type Props = {
  trigger: Instance<typeof Trigger>;
};

export default observer(({ trigger }: Props) => {
  let ConfigComponent;
  if (trigger.type in TriggerConfig) {
    // @ts-expect-error I hate TypeScript
    ConfigComponent = TriggerConfig[trigger.type];
  }

  return (
    <div className="rounded-md p-4 bg-gray-100 space-y-4">
      <label className="block text-sm leading-5 font-medium text-gray-700">
        Trigger Type
        <select
          className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          value={trigger.type}
          onChange={(e) => {
            const value = e.target.value as TriggerType;
            trigger.setType(value);
          }}
        >
          <option disabled value={TriggerType.EMPTY}>
            Select a type...
          </option>
          <option value={TriggerType.CHEER}>Cheer</option>
          <option value={TriggerType.FOLLOW}>New Follow</option>
          <option value={TriggerType.SUBSCRIPTION}>New Subscription</option>
          <option value={TriggerType.CHANNEL_POINTS}>
            Channel Points Reward
          </option>
          <option disabled>Hype Train (coming soon)</option>
          <option disabled>Chat Message (coming soon)</option>
        </select>
      </label>
      {ConfigComponent && <ConfigComponent config={trigger.config} />}
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:border-red-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
          onClick={trigger.delete}
        >
          Delete
        </button>
      </div>
    </div>
  );
});
