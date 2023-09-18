import { Outlet } from "react-router-dom";
import React from "react";

const PagesLayout = () => {
  return (
    <div>
      PagesLayout
      <Outlet />
    </div>
  );
};

export default PagesLayout;
