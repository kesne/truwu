import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("flex items-center", className)}>{children}</div>;
}

type Props = {
  title: string;
  action?: React.ReactNode;
};

export default function Header({ title, action }: Props) {
  return (
    <div className="p-4 grid grid-cols-3">
      <Section className="justify-start">
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
      </Section>
      <Section className="justify-center">
        <h1 className="text-center text-2xl font-bold text-gray-900 flex-1">
          {title}
        </h1>
      </Section>
      <Section className="justify-end">{action}</Section>
    </div>
  );
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
