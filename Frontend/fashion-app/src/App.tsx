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
import Missing from "./Modules/components/Missing";
import Login from "./Pages/Login/Login";
// import SignUp from "./Pages/SignUp";
import SignUp from "./Pages/SignUp/SignUp";
// import Register from "./Pages/Register/Register";
console.log("hello git");
import RegisterUser from "./Pages/Register/RegisterUser";
import PagesLayout from "./Layouts/PagesLayout";
import { RequireAuth } from "./Modules/components/RequireAuth";
import { AdminRequireAuth } from "./Modules/components/AdminRequireAuth";
import { Unauthorized } from "./Modules/components/Unauthorized";
import Admin from "./Modules/components/Admin";

const Roles = {
  Admin: 5150,
  User: 2001,
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PagesLayout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/avivohayon/fashionai/sign-up/" element={<SignUp />} />
          <Route path="/avivohayon/fashionai/login/" element={<Login />} />

          <Route
            path="/avivohayon/fashionai/unauthorized/"
            element={<Unauthorized />}
          />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/avivohayon/fashionai" element={<MainPageLayout />}>
              <Route path="" element={<CreateDesign />} />
            </Route>
            <Route element={<AdminRequireAuth />}>
              <Route path="/avivohayon/fashionai/admin/" element={<Admin />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
