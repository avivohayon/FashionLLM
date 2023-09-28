import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { Home, CreateDesign } from "./Pages";
// import MainPageLayout from "./Modules/PagesLayout/MainPageLayout";
import MainPageLayout from "./Layouts/MainPageLayout";
import Missing from "./Modules/components/Missing";
import Login from "./Pages/Login/Login";
// import SignUp from "./Pages/SignUp";
import SignUp from "./Pages/SignUp/SignUp";
import PagesLayout from "./Layouts/PagesLayout";
import { RequireAuth } from "./Modules/components/RequireAuth";
import { AdminRequireAuth } from "./Modules/components/AdminRequireAuth";
import { Unauthorized } from "./Modules/components/Unauthorized";
import Admin from "./Modules/components/Admin";
import UserFashionLayout from "./Layouts/UserFashionLayout";
import UserFashionList, {
  fashionListLoader,
} from "./Modules/components/UserFashionList";
import UserFashionData, {
  fashionDataLoader,
} from "./Pages/User/UserFashionData";
const Roles = {
  Admin: 5150,
  User: 2001,
};

const router = createBrowserRouter(
  createRoutesFromElements(
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
          {/* <Route path="" element={<CreateDesign />} /> */}
          <Route index element={<CreateDesign />} />
        </Route>
        <Route
          path="/avivohayon/fashionai/profile"
          element={<UserFashionLayout />}
        >
          <Route
            index
            element={<UserFashionList />}
            loader={fashionListLoader}
          />
          <Route
            path=":id"
            element={<UserFashionData />}
            loader={fashionDataLoader}
          />
        </Route>
        <Route element={<AdminRequireAuth />}>
          <Route path="/avivohayon/fashionai/admin/" element={<Admin />} />
        </Route>
      </Route>

      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
