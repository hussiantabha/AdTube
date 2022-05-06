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
      case "playlistData": {
        return { ...state, playlist: action.payload.value };
      }
      case "likedVideos": {
        return { ...state, likedVideos: action.payload.value };
      }
      case "watchLaterVideos": {
        return { ...state, watchLater: action.payload.value };
      }
      case "historyVideos": {
        return { ...state, history: action.payload.value };
      }
      default: {
        return { ...state };
      }
    }
  };
  const [videoState, dispatch] = useReducer(reducerFunc, {
    data: [],
    login: false,
    playlist: [],
    likedVideos: [],
    watchLater: [],
    history: [],
  });
  useEffect(async () => {
    const getData = await fetch("/api/videos");
    const convertedJSON = await getData.json();
    dispatch({ type: "videoData", payload: { value: convertedJSON.videos } });
  }, []);

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      dispatch({ type: "userLoggedIn", payload: { value: false } });
    } else if (sessionStorage.getItem("token") === "undefined") {
      dispatch({ type: "userLoggedIn", payload: { value: false } });
    } else {
      dispatch({ type: "userLoggedIn", payload: { value: true } });
    }
  }, []);

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
