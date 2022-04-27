import React, { useState, createContext, useReducer, useEffect } from "react";

const VideoContext = createContext({});

const VideoContextProvider = ({ children }) => {
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "videoData": {
        return { ...state, data: action.payload.value };
      }
      default: {
        return { ...state };
      }
    }
  };
  const [videoState, dispatch] = useReducer(reducerFunc, {
    data: [],
  });
  useEffect(async () => {
    const getData = await fetch("/api/videos");
    const convertedJSON = await getData.json();
    // console.log(convertedJSON.videos);
    dispatch({ type: "videoData", payload: { value: convertedJSON.videos } });
  }, []);
  return (
    <>
      <VideoContext.Provider value={{ videoState, dispatch }}>
        {children}
      </VideoContext.Provider>
    </>
  );
};

export { VideoContext, VideoContextProvider };
