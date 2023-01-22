import React from "react";
import { SignupForm } from "./components/SignupForm";
import { WelcomeHeader } from "../../components/WelcomeHeader";

export const Signup = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-slate-800 dark:shadow-md dark:shadow-gray-700 flex flex-col items-center rounded-md p-4 w-[80%] sm:w-[30%]">
        <WelcomeHeader />
        <SignupForm />
      </div>
    </div>
  );
};
