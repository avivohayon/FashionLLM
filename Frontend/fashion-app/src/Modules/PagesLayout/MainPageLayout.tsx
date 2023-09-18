import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Container as ContainerBS,
  Nav,
  Navbar as NavbarBS,
} from "react-bootstrap";
import { Container as ContainerMUI } from "@mui/material";
import Typography from "../components/Typography";
import SubNavbar from "../viewsMainPage/SubNavbar";

const MainPageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const isStartPath = location.pathname.startsWith('/start');

  const isSubNavbarActive =
    location.pathname === "/avivohayon/fashionai/hats" ||
    location.pathname === "/avivohayon/fashionai/glasses" ||
    location.pathname === "/avivohayon/fashionai/jewelry" ||
    location.pathname === "/avivohayon/fashionai/tops" ||
    location.pathname === "/avivohayon/fashionai/pants" ||
    location.pathname === "/avivohayon/fashionai/shoes";

  console.log("start MainPageLayout");
  console.log(isSubNavbarActive);
  return (
    <>
      <ContainerBS style={{ display: "flex", flexDirection: "column" }}>
        <Typography style={{ height: "1rem" }}>
          <Outlet />
        </Typography>
        {/* <ContainerBS>{isSubNavbarActive && <SubNavbar />}</ContainerBS> */}
      </ContainerBS>
    </>
  );
};

export default MainPageLayout;
