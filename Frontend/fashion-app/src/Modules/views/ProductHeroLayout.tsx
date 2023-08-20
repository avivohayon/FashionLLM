import * as React from "react";
import { Theme, styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// define a ew component name with a default css properies
const ProductHeroLayoutRoot = styled("section")(({ theme }) => ({
  border: "9px solid #FFBF00",
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    height: "80vh",
    minHeight: 500,
    maxHeight: 1300,
  },
}));

//  layout layer for cover the page screen with shadowing, some effects. etc
// the trick is to first define the parent compoent as  position: 'relative' and then
// we can use the position: 'absolute' and position it on all of the available flex space (allocated in the parent compoenent
// which used relative position) with the left.right.top.bottom. also we use the zidex to make the background be be under everything
// Now other element will act like this component doesn't exists like its just a 'css' styling
const Background = styled(Box)({
  // border:'9px solid #a57f01',

  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});

/**
 * SxProps type is a utility type used for defining inline styles using the sx prop.
 * It allows you to apply custom styles to components using the theme-based styling system provided by MUI.
 * So when we use the ProductHero component, behind the sene will wrap the component with the hero layout
 * with all the styling we define as well as this interface which alow us to use the field (prop) sxBackground={}'
 * remark for myself. we must send the sxBackground prop when creating a ProductHeroLayoutProps!!
 * (in the custom Typography function we didn't needed to cuz we use the '?' operator)
 */
interface ProductHeroLayoutProps {
  sxBackground: SxProps<Theme>;
  sxBackground2: SxProps<Theme>;
}
export default function ProductHeroLayout(
  props: React.HTMLAttributes<HTMLDivElement> & ProductHeroLayoutProps
) {
  const { sxBackground, sxBackground2, children } = props;

  return (
    <ProductHeroLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // border:'9px solid #FF7F50'
        }}
      >
        <img
          src="/src/assets/Util_pics/productHeroWonder.png"
          alt="wonder"
          width="147"
          height="80"
        />
        {children}
        {/* shading the background color and put it over the image (zindex:-1) */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "common.black",
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
        <Box
          component="img"
          src="/src/assets/Util_pics/productHeroArrowDown.png"
          height="16"
          width="12"
          alt="arrow down"
          sx={{ position: "absolute", bottom: 32 }}
        />
      </Container>
    </ProductHeroLayoutRoot>
  );
}
