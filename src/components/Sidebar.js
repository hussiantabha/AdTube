import React from "react";
import { BiHome, BiLike, BiHistory } from "react-icons/bi";
import { MdPlaylistPlay, MdVideoLibrary } from "react-icons/md";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="video-sidebar">
      <div className="sidebar-with-icons">
        <Link to="/" className="sidebar-item">
          <BiHome className="sidebar-item-icon" />
          <span>Home</span>
        </Link>
        <Link to="/" className="sidebar-item">
          <BiLike className="sidebar-item-icon" />
          <span>Liked</span>
        </Link>
        <Link to="/" className="sidebar-item">
          <BiHistory className="sidebar-item-icon" />
          <span>History</span>
        </Link>
        <Link to="/" className="sidebar-item">
          <MdVideoLibrary className="sidebar-item-icon" />
          <span>Watch Later</span>
        </Link>
        <Link to="/" className="sidebar-item">
          <MdPlaylistPlay className="sidebar-item-icon" />
          <span>Playlist</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
