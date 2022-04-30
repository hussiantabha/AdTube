import React, { useState, createContext, useReducer, useEffect } from "react";

const VideoContext = createContext({});

const VideoContextProvider = ({ children }) => {
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "videoData": {
        return { ...state, data: action.payload.value };
      }
      case "userLoggedIn": {
        return { ...state, login: action.payload.value };
      }
      default: {
        return { ...state };
      }
    }
  };
  const [videoState, dispatch] = useReducer(reducerFunc, {
    data: [],
    login: false,
  });
  useEffect(async () => {
    const getData = await fetch("/api/videos");
    const convertedJSON = await getData.json();
    dispatch({ type: "videoData", payload: { value: convertedJSON.videos } });
  }, []);
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
      <VideoContext.Provider
        value={{ videoState, dispatch, userLoggedIn, setUserLoggedIn }}
      >
        {children}
      </VideoContext.Provider>
    </>
  );
};

export { VideoContext, VideoContextProvider };
