import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  action?: React.ReactNode;
};

export default function Header({ title, action }: Props) {
  return (
    <div className="p-6 flex items-center">
      <Link
        to=".."
        className="rounded-full p-2 hover:bg-gray-200 focus:outline-none transition-colors duration-150"
      >
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path d="M15 19l-7-7 7-7"></path>
        </svg>
      </Link>
      <h1 className="text-center text-2xl font-bold text-gray-900 flex-1">
        {title}
      </h1>
      {action}
    </div>
  );
}
