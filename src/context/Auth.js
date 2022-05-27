import React, { useState, createContext, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { VideoContext } from "./Data";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children, login }) => {
  const location = useLocation();
  const { userLoggedIn } = useSelector((store) => store.login);
  return (
    <>
      {userLoggedIn ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export { RequireAuth };
