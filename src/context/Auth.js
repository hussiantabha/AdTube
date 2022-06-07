import React, { useState, createContext, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { VideoContext } from "./Data";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginState } from "../features/login";
const RequireAuth = ({ children, login }) => {
  const location = useLocation();
  const { userLoggedIn } = useSelector((store) => store.login);
  const dispatch1 = useDispatch();
  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      dispatch1(loginState({ value: false }));
    } else if (sessionStorage.getItem("token") === undefined) {
      dispatch1(loginState({ value: false }));
    } else if (
      sessionStorage.getItem("token") === sessionStorage.getItem("token")
    ) {
      dispatch1(loginState({ value: true }));
    }
  }, []);
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
