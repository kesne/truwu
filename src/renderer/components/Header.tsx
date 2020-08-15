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
    <div className="px-4 app-header overflow-hidden grid grid-cols-6 border-b sticky top-0 z-20 bg-white">
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
  );
}
