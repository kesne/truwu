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
  children?: React.ReactNode;
};

export default function Header({ title, action, children }: Props) {
  return (
    <div
      className={clsx(
        "px-4 overflow-hidden border-b sticky top-0 z-20 bg-white"
      )}
    >
      <div
        className={clsx("grid grid-cols-6", children ? "py-4" : "app-header")}
      >
        <Section className="justify-start col-span-1">
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
        <Section className="justify-center col-span-4">
          <h1 className="text-center text-2xl font-bold text-gray-900 flex-1">
            {title}
          </h1>
        </Section>
        <Section className="justify-end col-span-1">{action}</Section>
      </div>
      {children && <div className="pb-4">{children}</div>}
    </div>
  );
}
