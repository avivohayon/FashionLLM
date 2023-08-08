import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import {Container as ContainerBS} from "react-bootstrap"

// import {Navbar2} from './Components'
// import {StoreLayout} from './Layouts'
import { Container as ContainerMUI } from "@mui/material";
import { Home, CreateDesign } from "./Pages";
import Header from "./Modules/views/Header";
import MainPageLayout from "./Modules/PagesLayout/MainPageLayout";
import { Select } from "./Modules/components/Select";
// import SignUp from "./Pages/SignUp";
import SignUp from "./Pages/SignUp/SignUp";
// import Register from "./Pages/Register/Register";
console.log("hello git");
import RegisterUser from "./Pages/Register/RegisterUser";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/avivohayon/fashionai/sign-up/" element={<SignUp />} />
        <Route path="/avivohayon/fashionai" element={<MainPageLayout />}>
          <Route path="" element={<CreateDesign />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
