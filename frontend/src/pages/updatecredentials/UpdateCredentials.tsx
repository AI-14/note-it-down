import React from "react";
import { UpdateCredForm } from "./components/UpdateCredForm";

export const UpdateCredentials = (): JSX.Element => {
  return (
    <div className=" bg-white dark:bg-slate-800 dark:shadow-md dark:shadow-gray-700 max-w-[720px] w-[98%] flex flex-col gap-20 p-4 mt-2 rounded-xl shadow-md shadow-gray-400">
      <UpdateCredForm/>
    </div>
  );
};
