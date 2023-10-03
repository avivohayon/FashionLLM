import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Modules/views/Footer";

const UserFashionLayout = () => {
  return (
    <div>
      {/* <br /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserFashionLayout;
