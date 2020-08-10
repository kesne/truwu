import React from "react";
import clsx from "clsx";

type Props = {
  enabled: boolean;
  onChange(enabled: boolean): void;
};

export default function Enabled({ enabled, onChange }: Props) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium leading-5 text-gray-700">
        Enabled
      </span>
      <span
        role="checkbox"
        tabIndex={0}
        aria-checked="false"
        className={clsx(
          "relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline",
          !enabled && "bg-gray-200",
          enabled && "bg-indigo-600"
        )}
        onClick={() => {
          onChange(!enabled);
        }}
      >
        <span
          aria-hidden="true"
          className={clsx(
            "inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200",
            !enabled && "translate-x-0",
            enabled && "translate-x-5"
          )}
        />
      </span>
    </div>
  );
}
