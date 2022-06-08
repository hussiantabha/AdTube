import React, { useState, createContext, useReducer, useEffect } from "react";

const VideoContext = createContext({});

const VideoContextProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  // useEffect(() => {
  //   if (sessionStorage.getItem("token") === null) {
  //     dispatch({ type: "userLoggedIn", payload: { value: false } });
  //   } else if (sessionStorage.getItem("token") === "undefined") {
  //     dispatch({ type: "userLoggedIn", payload: { value: false } });
  //   } else {
  //     dispatch({ type: "userLoggedIn", payload: { value: true } });
  //   }
  // }, [videoState]);
  return (
    <>
      <VideoContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
        {children}
      </VideoContext.Provider>
    </>
  );
};

export { VideoContext, VideoContextProvider };
