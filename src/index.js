import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MockAPI from "./components/Mockman";
import { VideoContextProvider } from "./context/Data";
import DisplayVideo from "./pages/DisplayVideo";

// Call make Server
makeServer();

ReactDOM.render(
  <BrowserRouter>
    <VideoContextProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/video/:videoId" element={<DisplayVideo />} />
        <Route path="/mockman" element={<MockAPI />} />
      </Routes>
    </VideoContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
