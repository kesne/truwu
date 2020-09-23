import React from "react";
import clsx from "clsx";

type Props = {
  checked: boolean;
  onClick(): void;
};

export default function Toggle({ checked = false, onClick }: Props) {
  return (
    <span
      role="checkbox"
      tabIndex={0}
      aria-checked={checked}
      className={clsx(
        "relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline",
        checked ? "bg-indigo-600" : "bg-gray-200"
      )}
      onClick={onClick}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      ></span>
    </span>
  );
}
