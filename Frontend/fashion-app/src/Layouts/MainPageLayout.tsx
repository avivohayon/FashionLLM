import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container as ContainerBS, Navbar as NavbarBS } from "react-bootstrap";
import Typography from "../Modules/components/Typography";
import Footer from "../Modules/views/Footer";

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
