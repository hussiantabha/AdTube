import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav-header">
          <Link to="/">
            <h1 className="nav-logo">AdTube</h1>
          </Link>
        </div>
        <div className="nav-btn-container">
          <button className="btn btn-primary">Login</button>
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
