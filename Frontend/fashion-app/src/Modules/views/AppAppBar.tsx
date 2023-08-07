import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
// import AppBar from '../components/AppBar';
// import Toolbar from '../components/Toolbar';
import { AppBar, Toolbar } from "../components";
import { makeStyles } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  return (
    <>
      <AppBar position="fixed" sx={{ width: "100%", maxWidth: "100%" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "80%",
            margin: "0 auto",
          }}
          disableGutters
        >
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="secondary.main"
            // textTransform='uppercase'
            component={RouterLink}
            to="/"
            // fontFamily={'Oxygen'}
            // sx={{ fontSize: 24 }}
          >
            {"Celeb  AIty Closet"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              color="secondary.light"
              variant="h6"
              underline="none"
              component={RouterLink}
              to="/avivohayon/fashionai/sign-in/"
              // textTransform='uppercase'
              sx={rightLink}
            >
              {"Sign In"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              textTransform="uppercase"
              component={RouterLink}
              to="/avivohayon/fashionai/sign-up/"
              sx={{ ...rightLink, color: "secondary.light" }}
            >
              {"Sign Up"}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default AppAppBar;
