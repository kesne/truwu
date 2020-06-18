import React from "react";

type Props = {
  title: string;
  subtitle: string;
  active?: boolean;
};

export default function ListItem({ title, subtitle, active }: Props) {
  return (
    <li className="p-6 flex hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
      <div className="flex-1">
        <div className="font-bold text-gray-900">{title}</div>
        <div className="text-gray-600">{subtitle}</div>
      </div>
      <div className="flex items-center">
        {active ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-green-100 text-green-800">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-red-100 text-red-800">
            Disabled
          </span>
        )}
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 ml-6"
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </li>
  );
}
