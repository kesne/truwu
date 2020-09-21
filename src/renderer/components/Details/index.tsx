import React from "react";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import Header from "../Header";
import Toggle from "./Toggle";
import Trigger from "./Trigger";
import { useMst } from "../MSTContext";
import Actions from "./Actions";

function SectionHeader({
  title,
  subtitle,
  action,
  onClick,
}: {
  title: string;
  subtitle: string;
  action: string;
  onClick(): void;
}) {
  return (
    <div className="sticky bg-white p-6 z-10 header-offset">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-xl">{title}</div>
          <p className="text-gray-700">{subtitle}</p>
        </div>
        <button
          onClick={onClick}
          className="rounded-full border-2 border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white transition-colors focus:outline-none duration-300 text px-4 py-2 font-semibold"
        >
          {action}
        </button>
      </div>
    </div>
  );
}

export default observer(() => {
  const params = useParams();
  const store = useMst();

  const routine = store.routines.items[parseInt(params.id, 10)];

  return (
    <>
      <Header
        title={routine.name}
        action={
          !routine.isComplete && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-yellow-100 text-yellow-800 mr-2">
              Incomplete
            </span>
          )
        }
      />
      <div className="divide-y">
        <div className="p-6">
          <div className="space-y-6">
            <label className="block text-sm font-medium leading-5 text-gray-700">
              Name
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  autoComplete="off"
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  value={routine.name}
                  onChange={(e) => routine.setName(e.target.value)}
                />
              </div>
            </label>
            <div>
              <Toggle
                title="Enabled"
                enabled={routine.enabled}
                onToggle={() => routine.toggleEnabled()}
              />
            </div>
            <div>
              <Toggle
                title="Require Approval"
                enabled={routine.requireApproval}
                onToggle={() => routine.toggleRequireApproval()}
              />
            </div>
            <div>
              <Toggle
                title="Run In Queue"
                enabled={routine.queue}
                onToggle={() => routine.toggleQueue()}
              />
            </div>
          </div>
        </div>
        <div>
          <SectionHeader
            title="Triggers"
            subtitle="Control which events cause this routine to fire."
            action="Add"
            onClick={routine.createTrigger}
          />
          <div className="p-6 space-y-2">
            {routine.triggers.map((trigger, i) => (
              <Trigger key={i} trigger={trigger} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeader
            title="Actions"
            subtitle="Define what happens when this routine is triggered."
            action="Add"
            onClick={routine.createAction}
          />
          <div className="p-6">
            <Actions routine={routine} />
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">Test Routine</div>
          </div>
          <p>TODO: Allow us to test the routine.</p>
        </div>
      </div>
    </>
  );
});
