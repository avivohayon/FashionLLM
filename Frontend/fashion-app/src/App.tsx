import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import {Container as ContainerBS} from "react-bootstrap"
import {
  Store,
  About,
  Glasses,
  Hats,
  Jewelry,
  Pants,
  Shoes,
  Tops,
} from "./Pages2";
// import {Navbar2} from './Components'
// import {StoreLayout} from './Layouts'
import { Container as ContainerMUI } from "@mui/material";
import { Home, CreateDesign } from "./Pages";
import Header from "./Modules/views/Header";
import MainPageLayout from "./Modules/PagesLayout/MainPageLayout";
import { Select } from "./Modules/components/Select";

console.log("hello git");

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/avivohayon/fashionai" element={<MainPageLayout />}>
          <Route path="" element={<CreateDesign />} />
          {/* <Route path='hats' element={<Hats/>} />
            <Route path='glasses' element={<Glasses/>} />
            <Route path='jewelry' element={<Jewelry/>} />
            <Route path='tops' element={<Tops/>} />
            <Route path='pants' element={<Pants/>} />
            <Route path='shoes' element={<Shoes/>} /> */}
        </Route>

        {/* <Route path="/about" element={<About />} /> */}
      </Routes>

      {/* <ContainerMUI sx={{display:'flex',border:'9px solid red',height:'100vh' }}>  */}
      {/* <Home/> */}

      {/* </ContainerMUI> */}
    </>
  );
}

export default App;
{
  /* <Navbar2 />
      <Routes>
        <Route path="/" element={<Home/>} /> */
}

{
  /* <Route path="/store" element={<StoreLayout/>}>
          <Route path='' element={<CreateDesign/>} />
            <Route path='hats' element={<Hats/>} />
            <Route path='glasses' element={<Glasses/>} />
            <Route path='jewelry' element={<Jewelry/>} />
            <Route path='tops' element={<Tops/>} />
            <Route path='pants' element={<Pants/>} />
            <Route path='shoes' element={<Shoes/>} />

        </Route> */
}

{
  /* <Route path="/about" element={<About />} />
      </Routes> */
}
