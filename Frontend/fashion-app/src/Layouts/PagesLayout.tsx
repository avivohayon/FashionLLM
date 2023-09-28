import { Outlet } from "react-router-dom";
import React from "react";
import Header from "../Modules/views/Header";

const PagesLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PagesLayout;
