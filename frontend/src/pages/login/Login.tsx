import React from "react";

import { WelcomeHeader } from "../../components/WelcomeHeader";
import { LoginForm } from "./components/LoginForm";

export const Login = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-slate-800 dark:shadow-md dark:shadow-gray-700 flex flex-col items-center rounded-md p-4 w-[80%] sm:w-[30%]">
        <WelcomeHeader />
        <LoginForm />
      </div>
    </div>
  );
};
