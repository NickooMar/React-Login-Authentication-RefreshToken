// import React from "react";

// import { useLocation, Navigate, Outlet } from "react-router-dom";

// import useAuth from "../hooks/useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//   const { auth } = useAuth();
//   const location = useLocation();

//   return auth?.roles?.find((role) => allowedRoles?.includes(role))
//   ? <Outlet />
//   : auth?.accessToken
//     ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//     : <Navigate to="/login" state={{ from: location }} replace />
//   ;
// };

// export default RequireAuth;

import React from "react";

import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
