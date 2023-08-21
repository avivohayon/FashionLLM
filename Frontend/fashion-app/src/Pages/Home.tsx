import * as React from "react";
import AppAppBar from "../Modules/views/AppAppBar";
import withRoot from "../Modules/withRoot";
import ProductHero from "../Modules/views/ProductHero";
import ProductCategories from "../Modules/views/ProductCategories";
import ProductHowItWorks from "../Modules/views/ProductHowItWorks";
import HomeLayout from "../Modules/views/HomeLayout";
import Footer from "../Modules/views/Footer";
import brandsBg from "../assets/Util_pics/Hina-Mincho/brands_bg2.png";
function Home() {
  return (
    <React.Fragment>
      {/* <AppAppBar/> */}
      <HomeLayout backgroundImage={brandsBg}>
        <ProductHero />

        <ProductHowItWorks />

        <ProductCategories />
      </HomeLayout>
      <Footer />
      {/* <div>aviv ohayon</div> */}
    </React.Fragment>
  );
}

export default withRoot(Home);
