import React, { useState, createContext, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { VideoContext } from "./Data";
import { useLocation, useNavigate } from "react-router-dom";

const RequireAuth = ({ children, login }) => {
  const { videoState } = useContext(VideoContext);
  const location = useLocation();
  return (
    <>
      {videoState.login ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export { RequireAuth };
