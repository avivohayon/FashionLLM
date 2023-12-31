import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import * as celeb_images from "../../assets/Celeb_pics";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "inline",
  borderRadius: 0,
  height: "23vh",
  margin: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: celeb_images.billie_eilish,
    title: "Billie Eilish",
    width: "30%",
  },
  {
    url: celeb_images.danny_carry,
    title: "Danny Carry",
    width: "20%",
  },
  {
    url: celeb_images.peled,
    title: "Peled",
    width: "35%",
  },
  {
    url: celeb_images.degrass_tyson,
    title: "Neil deGrasse Tyson",
    width: "50%",
  },
  {
    url: celeb_images.lady_gaga,
    title: "Lady Gaga",
    width: "38%",
  },
  {
    url: celeb_images.netta,
    title: "Netta",
    width: "24%",
  },
  {
    url: celeb_images.nicky_minaj,
    title: "Nicky Minaj",
    width: "40%",
  },
  {
    url: celeb_images.dennis_rodman,
    title: "Dennis Rodman",
    width: "20%",
  },
];

const breakpoint = {
  default: "max",
};
export default function ProductCategories() {
  const navigate = useNavigate();
  const handleClock = (title: string) => {
    navigate(`/avivohayon/fashionai/example/${title}`);
  };

  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Masonry
        breakpointCols={breakpoint}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {/* init the base button containter for the images to be in */}
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
              borderRadius: "23px",
              overflow: "hidden",
              marginLeft: "2rem",
            }}
            onClick={() => handleClock(image.title)}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 10%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Masonry>
    </Container>
  );
}
