import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { AppBar, Toolbar } from "../components";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import useLogout from "../../Hooks/useLogout";
import useLogout from "../../Hooks/useLogout";
import useAuth from "../../Hooks/useAuth";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  const logout = useLogout();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const signOut = async () => {
    await logout();
    navigate("/");
  };
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
          color="primary.main"
          disableGutters
        >
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-start",
              marginLeft: "6rem",
            }}
          >
            <Link
              variant="h6"
              underline="none"
              color="secondary.dark"
              component={RouterLink}
              to="/"
            >
              {"Celeb  AIty Closet"}
            </Link>
          </Box>
          {auth?.username ? (
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Link
                sx={{ ...rightLink, textTransform: "none" }}
                style={{ color: "red" }}
                variant="h6"
                underline="none"
                component={RouterLink}
                to="/avivohayon/fashionai/profile"
              >
                {`Profile: ${auth.username}`}
              </Link>

              <Link
                sx={{ ...rightLink, textTransform: "none" }}
                style={{ color: "#eb8e8e" }}
                variant="h6"
                underline="none"
                color="secondary.dark"
                component={RouterLink}
                to="/"
                onClick={signOut}
              >
                {" - Log Out"}
              </Link>
              {auth.username === "aviv" && (
                <Link
                  style={{ color: "#006400" }}
                  variant="h6"
                  underline="none"
                  textTransform="uppercase"
                  component={RouterLink}
                  to="/avivohayon/fashionai/admin/"
                  sx={{ ...rightLink, color: "secondary.light" }}
                >
                  {"admin"}
                </Link>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link
                style={{ color: "#006400" }}
                variant="h6"
                underline="none"
                component={RouterLink}
                to="/avivohayon/fashionai/login/"
                sx={rightLink}
              >
                {"Log In"}
              </Link>
              <Link
                style={{ color: "#006400" }}
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
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default AppAppBar;
