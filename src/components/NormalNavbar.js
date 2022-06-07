import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VideoContext } from "../context/Data";
import { useDispatch, useSelector } from "react-redux";
import { loginState } from "../features/login";
const NormalNavbar = () => {
  let location = useLocation();
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
  const logout = () => {
    sessionStorage.clear();
    dispatch1(loginState({ value: false }));
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
        autoClose={5000}
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
      <nav className="nav-normal">
        <div className="nav-header">
          <Link to="/">
            <h1 className="nav-logo">AdTube</h1>
          </Link>
        </div>
        <div className="nav-btn-container">
          {userLoggedIn ? (
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
