import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto pt-10">
      <div className="rounded-lg shadow-lg bg-white mx-4">{children}</div>
    </div>
  );
}
