import React, { useState, useEffect, useContext } from "react";
import NormalNavbar from "../components/NormalNavbar";
import { VideoContext } from "../context/Data";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Playlist = () => {
  const { videoState, dispatch } = useContext(VideoContext);
  console.log(videoState);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjVkM2MzNy01MjcwLTQ5NjgtODQ0MC1iZTM3ZDFhNTE5OGUiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.DPS9hLIaykSx9V9SwXsOhWgWQ7nk8MtTyumcWlbYamM";
  const deletePlaylist = async (id) => {
    const postData = await fetch(`/api/user/playlists/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
    });
    if (postData.status === 200) {
      const convertedJSON = await postData.json();
      dispatch({
        type: "playlistData",
        payload: { value: convertedJSON.playlists },
      });
      toast.success("Deleted Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <NormalNavbar />
      {videoState.playlist.length > 0 ? (
        videoState.playlist.map((item) => {
          console.log(item.videos);
          return (
            <>
              <main className="playlist-container">
                <div className="playlist-top-container">
                  <h2>{item.title}</h2>
                  <button
                    className="btn btn-primary-outline"
                    onClick={() => deletePlaylist(item._id)}
                  >
                    Delete Playlist
                  </button>
                </div>
                <main className="playlist-video-card-container">
                  {item.videos.map(
                    ({
                      _id,
                      title,
                      thumbnail,
                      avatar_url,
                      creator,
                      views,
                      uploaded,
                      duration,
                    }) => {
                      return (
                        <div className="video-card-container">
                          <Link to={`/video/${_id}`}>
                            <div className="video-img-container">
                              <img src={thumbnail} className="video-img" />
                              <span className="video-duration-badge">
                                {duration}
                              </span>
                            </div>
                            <div className="video-content-container">
                              <img
                                src={avatar_url}
                                className="creator-avatar"
                              />
                              <div className="video-text-container">
                                <h3>{title}</h3>
                                <p>{creator}</p>
                                <p>{`${views} views . ${uploaded}`}</p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    }
                  )}
                </main>
              </main>
            </>
          );
        })
      ) : (
        <h1 className="center-align">No playlist found</h1>
      )}
    </>
  );
};

export default Playlist;
