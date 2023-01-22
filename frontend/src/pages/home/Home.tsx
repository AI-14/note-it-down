import React from "react";
import { Outlet } from "react-router-dom";
import { CommonHeader } from "./components/CommonHeader";

export const Home = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-between items-center gap-12">
      <CommonHeader />
      <Outlet />
    </div>
  );
};
