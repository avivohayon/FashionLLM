import * as React from "react";
import Button from "../components/Button";
import Typography from "../components/Typography";
import backgroundImage from "../../assets/Max_pics/DSC_1.jpg";
import backgroundImage2 from "../../assets/Max_pics/DSC_3.jpg";
import ProductHeroLayout from "./ProductHeroLayout";
import onlineImage from "../../assets/Util_pics//DrawKit_0027_Online_Shopping_Illustrations/DrawKit-Vector-Illustration-online-shopping/PNG/online.png";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const backgroundImage3 =
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400";

export default function ProductHero() {
  return (
    <>
      {/* <Container> */}

      <ProductHeroLayout
        sxBackground={{
          backgroundImage: `url(${onlineImage})`,
          backgroundColor: "#7fc7d9", // Average color of the background image.
          backgroundPosition: "center",
        }}
        sxBackground2={{
          backgroundImage: `url(${backgroundImage2})`,
          backgroundColor: "#7fc7d9", // Average color of the background image.
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "18px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          ASOS | Shein | Zara | H&M | Forever 21 | Boohoo | PrettyLittleThing |
          Missguided | Nasty Gal | Urban Outfitters
        </div>
        {/* Increase the network loading priority of the background image. 
        the idea is to preload the img (from src) without render it, that ensures that it is loaded into the browser's 
        cache,so when it is later used as a background image in the ProductHeroLayout component, 
        it can be quickly accessed without causing delays or flickering during rendering. */}
        <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Typography
          color="inherit"
          align="center"
          variant="h2"
          marked="center"
          style={{
            fontWeight: "bold",
            textShadow:
              "2px 2px 1px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
            color: "#fff",
          }}
        >
          Feel Like the STAR you are
        </Typography>
        <Typography
          color="primary.main"
          align="center"
          variant="h5"
          sx={{
            mb: 4,
            mt: { xs: 4, sm: 10 },
            fontWeight: "bold",
            textShadow:
              "2px 2px 1px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
          }}
        >
          Discover the experience
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          sx={{
            minWidth: 200,
            background: "#006400",
            color: "#fffef3",
            borderRadius: "13px",
            // ":hover": { color: "red" },
          }}
        >
          <Link
            style={{ color: "#fdfdfd" }}
            variant="h6"
            underline="none"
            textTransform="uppercase"
            component={RouterLink}
            to="/avivohayon/fashionai/"
            sx={{
              textShadow:
                "2px 2px 1px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
            }}
          >
            {"Start"}
          </Link>
          {/* Start */}
        </Button>
      </ProductHeroLayout>
    </>
  );
}

//indianred
