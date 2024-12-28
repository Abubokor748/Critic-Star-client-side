import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="font-Poppins bg-[#F3F3F3] py-10">
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
