import * as React from "react";
import { Theme, styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "primary.dark",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <Box component="section" sx={{ display: "flex" }}>
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          marked="center"
          component="h2"
          sx={{
            mb: 14,
            background: "white",
            border: "3px solid #CFB436",
            padding: " 14px 14px 14px 14px",
          }}
        >
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  ...item,
                  background: "white",
                  border: "3px solid #CFB436",
                  minHeight: "50vh",
                }}
              >
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src="/src/assets/Util_pics/thought.png"
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  <span style={{ display: "block", marginBottom: "10px" }}>
                    &bull;<strong> Think of ANY </strong>famous person you like
                    its style and click on "Start Now" button.
                  </span>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  ...item,
                  background: "white",
                  border: "3px solid #CFB436",
                  minHeight: "50vh",
                }}
              >
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="/src/assets/Util_pics/edit.png"
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  <span style={{ display: "block", marginBottom: "10px" }}>
                    &bull; <strong>Write </strong>the name of your chosen person
                    in the box.
                  </span>
                  <span style={{ display: "block", marginBottom: "10px" }}>
                    &bull;<strong> Pick </strong>a fashion company service of
                    your choice.
                  </span>
                  <span style={{ display: "block" }}>
                    &bull; <strong>Click </strong>on the Submit button.
                  </span>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  ...item,
                  background: "white",
                  border: "3px solid #CFB436",
                  minHeight: "50vh",
                }}
              >
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="/src/assets/Util_pics/inspiration.png"
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  <span style={{ display: "block", marginBottom: "10px" }}>
                    &bull; <strong>Start</strong> your creative journey! by
                    choosing from a wide variety of clothing options range from{" "}
                    <strong>hats, glasses, tops, shoes</strong> and{" "}
                    <strong>more!</strong>
                  </span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/avivohayon/fashionai/"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
