import "./App.css";
import React, { useContext } from "react";
import ListingVideos from "./components/ListingVideos";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { VideoContext } from "./context/Data";

function App() {
  const { videoState, dispatch } = useContext(VideoContext);
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <ListingVideos />
    </div>
  );
}

export default App;
