import React from "react";

export const WelcomeHeader = (): JSX.Element => {
  return (
    <h2 className="text-2xl font-semibold p-2 flex flex-col items-center sm:flex-row sm:gap-2">
      <p className="dark:text-slate-200">Welcome</p>
      <p className="dark:text-slate-200">to{"  "}</p>
      <span className=" text-yellow-400 italic font-bold">NoteItDown</span>
    </h2>
  );
};
