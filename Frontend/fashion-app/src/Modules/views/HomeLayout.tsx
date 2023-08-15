import React, { ReactNode } from "react";
import { styled } from "@mui/system";
import brandBG from "../../assets/Util_pics/Hina-Mincho/brands_bg2.png";
interface HomePageLayoutProps {
  children: ReactNode;
  backgroundImage: string; // The path to the background image
}

const HomeLayoutRoot = styled("div")(
  ({ backgroundImage }: HomePageLayoutProps) => ({
    position: "relative",
    width: "100%",
    height: "100%",
  })
);

const BackgroundImage = styled("div")<HomePageLayoutProps>(
  ({ backgroundImage }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "repeat",
    filter: "blur(3px)", // Add blur effect
    opacity: 0.6, // Adjust opacity for transparency
    zIndex: -3,
  })
);

const HomeLayout: React.FC<HomePageLayoutProps> = ({
  children,
  backgroundImage,
}) => {
  return (
    <HomeLayoutRoot backgroundImage={backgroundImage}>
      <BackgroundImage backgroundImage={backgroundImage} children={undefined} />
      {children}
    </HomeLayoutRoot>
  );
};

export default HomeLayout;
