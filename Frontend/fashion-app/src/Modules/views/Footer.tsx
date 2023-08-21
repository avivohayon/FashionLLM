import * as React from "react";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function Footer() {
  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          overflow: "hidden",
          bgcolor: "black",
          maxHeight: "30vh",
        }}
      >
        <Container
          sx={{ mt: 8, mb: 30, display: "flex", position: "relative" }}
        >
          <Box
            component="img"
            src="/src/assets/Util_pics/productCurvyLines.png"
            alt="curvy lines"
            sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
          />
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <section className="mb-4">
                  <MDBBtn
                    outline
                    color="light"
                    floating
                    className="m-1"
                    href="https://github.com/avivohayon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </MDBBtn>

                  <MDBBtn
                    outline
                    color="light"
                    floating
                    className="m-1"
                    href="https://www.linkedin.com/in/aviv-ohayon-197993200/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </MDBBtn>
                </section>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="/src/assets/Util_pics/productValues2.svg"
                  alt="graph"
                  sx={{ height: 15 }}
                />
                <section style={{ color: "white" }}>
                  <h2>Fashion LLM</h2>
                </section>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <section className="mb-4">
                  <MDBBtn
                    color="link" // Remove the outline and make it a link
                    className="m-1"
                    href="/avivohayon/fashionai/"
                  >
                    Start Now
                  </MDBBtn>

                  <MDBBtn
                    color="link" // Remove the outline and make it a link
                    className="m-1"
                    href="/avivohayon/fashionai/sign-up/"
                  >
                    Sign up
                  </MDBBtn>

                  <MDBBtn
                    color="link" // Remove the outline and make it a link
                    className="m-1"
                    // href="/avivohayon/fashionai/"
                  >
                    About
                  </MDBBtn>
                </section>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <MDBFooter className="text-center" color="white" bgColor="dark">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright: aviv-ohayon
        </div>
      </MDBFooter>
    </>
  );
}

export default Footer;
