import React from "react";
import { Link, useLocation } from "react-router-dom";

const NormalNavbar = () => {
  let location = useLocation();
  return (
    <>
      <nav className="nav-normal">
        <div className="nav-header">
          <Link to="/">
            <h1 className="nav-logo">AdTube</h1>
          </Link>
        </div>
        <div className="nav-btn-container">
          <Link
            className="btn btn-primary"
            to="/login"
            state={{ from: location }}
          >
            Login
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NormalNavbar;
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
