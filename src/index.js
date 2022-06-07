import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MockAPI from "./components/Mockman";
import { VideoContextProvider } from "./context/Data";
import DisplayVideo from "./pages/DisplayVideo";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Playlist from "./pages/Playlist";
import WatchLater from "./pages/WatchLater";
import LikePage from "./pages/LikePage";
import { Provider } from "react-redux";
import { store } from "./store";
import History from "./pages/History";
import { RequireAuth } from "./context/Auth";
// Call make Server
makeServer();

ReactDOM.render(
  <BrowserRouter>
    <VideoContextProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/video/:videoId" element={<DisplayVideo />} />
          <Route path="/mockman" element={<MockAPI />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/like"
            element={
              <RequireAuth>
                <LikePage />
              </RequireAuth>
            }
          />
          <Route
            path="/playlist"
            element={
              <RequireAuth>
                <Playlist />
              </RequireAuth>
            }
          />
          <Route
            path="/watchlater"
            element={
              <RequireAuth>
                <WatchLater />
              </RequireAuth>
            }
          />
          <Route
            path="/history"
            element={
              <RequireAuth>
                <History />
              </RequireAuth>
            }
          />
        </Routes>
      </Provider>
    </VideoContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
