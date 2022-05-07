import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { VideoContext } from "../context/Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  let location = useLocation();
  const { videoState, userLoggedIn, dispatch } = useContext(VideoContext);
  const logout = () => {
    sessionStorage.clear();
    dispatch({ type: "userLoggedIn", payload: { value: false } });
    toast.success("User Logged Out", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <nav className="nav">
        <div className="nav-header">
          <Link to="/">
            <h1 className="nav-logo">AdTube</h1>
          </Link>
        </div>
        <div className="nav-btn-container">
          {videoState.login ? (
            <button className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link
              className="btn btn-primary"
              to="/login"
              state={{ from: location }}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
{
  /* <div className="nav-fixed">
  <div className="nav-header">
    <h1 className="nav-logo">AdTube</h1>
    <span className="nav-subtext">A YT without Ad</span>
  </div>
  <div>
    <button className="btn btn-primary">Login</button>
  </div>
</div>; */
}
