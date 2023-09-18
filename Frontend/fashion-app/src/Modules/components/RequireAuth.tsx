import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import UserAuthProp from "../../Context/AuthProvider";

type requireRolesProps = {
  allowedRoles: number[];
};

const RequireAuth = ({ allowedRoles }: requireRolesProps) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("auth from requireAuth");
  console.log(auth?.roles);

  console.log(allowedRoles);
  return auth?.roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate
      to="/avivohayon/fashionai/unauthorized/"
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate
      to="/avivohayon/fashionai/login/"
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
