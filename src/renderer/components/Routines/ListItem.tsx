import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  subtitle: string;
  active?: boolean;
  incomplete?: boolean;
  onDelete(): void;
};

export default function ListItem({
  id,
  title,
  subtitle,
  incomplete,
  active,
  onDelete,
}: Props) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(String(id));
      }}
      className="p-6 flex hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
    >
      <div className="flex-1">
        <div className="font-bold text-gray-900">{title}</div>
        <div className="text-gray-600">{subtitle}</div>
      </div>
      <div className="flex items-center">
        {incomplete && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-yellow-100 text-yellow-800 mr-2">
            Incomplete
          </span>
        )}
        {active ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-green-100 text-green-800 mr-2">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-red-100 text-red-800 mr-2">
            Disabled
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-700"
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
