import * as React from "react";
import { Theme, styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";

// const Background = styled(Box)({
//   // border:'9px solid #a57f01',

//   position: "absolute",
//   left: 0,
//   right: 0,
//   top: 0,
//   bottom: 0,
//   backgroundSize: "cover",z
//   backgroundRepeat: "no-repeat",
//   zIndex: -2,
// });

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
                  src="/src/assets/Util_pics/productHowItWorks1.svg"
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Think of ANY famous person you like its style and click on
                  "Start Now" button.
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
                  src="/src/assets/Util_pics/productHowItWorks2.svg"
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  First come, first served. Our offers are in limited
                  quantities, so be quick.
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
                  src="/src/assets/Util_pics/productHowItWorks3.svg"
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  {"New offers every week. New experiences, new surprises. "}
                  {"Your Sundays will no longer be alike."}
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
          href="/premium-themes/onepirate/sign-up/"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
        {/* </ProductHowItWorksLayout> */}
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
