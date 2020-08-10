import React from "react";
import { Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import {
  Trigger,
  MatchCondition,
  TriggerType,
  CheerTriggerConfig,
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
    <>
      <label className="block text-sm font-medium leading-5 text-gray-700">
        Amount
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            autoComplete="off"
            className="form-input block w-full sm:text-sm sm:leading-5"
            type="number"
            value={String(config.amount)}
            onChange={(e) =>
              config.setAmount(parseInt(e.target.value, 10) || null)
            }
          />
        </div>
      </label>
      <label className="block text-sm leading-5 font-medium text-gray-700">
        Match Condition
        <select
          value={config.matchCondition}
          onChange={(e) => {
            const value = e.target.value as MatchCondition;
            config.setMatchCondition(value);
          }}
          className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        >
          <option value={MatchCondition.EQUALS}>= (equals)</option>
          <option value={MatchCondition.GREATER_THAN}>
            &gt; (greater than)
          </option>
          <option value={MatchCondition.LESS_THAN}>&lt; (less than)</option>
        </select>
      </label>
    </>
  )
);

const TriggerConfig = {
  [TriggerType.CHEER]: Cheer,
  // [TriggerType.]: Reward,
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
          <option disabled>Channel Points Reward (coming soon)</option>
          <option disabled>Hype Train (coming soon)</option>
          <option disabled>Chat Message (coming soon)</option>
        </select>
      </label>
      {ConfigComponent && <ConfigComponent config={trigger.config} />}
    </div>
  );
});
