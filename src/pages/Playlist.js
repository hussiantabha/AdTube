import React, { useState, useEffect, useContext } from "react";
import NormalNavbar from "../components/NormalNavbar";
import { VideoContext } from "../context/Data";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePlaylistReducer,
  deletePlaylistVideoReducer,
  getPlaylistData23,
} from "../features/playlist";

const Playlist = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjVkM2MzNy01MjcwLTQ5NjgtODQ0MC1iZTM3ZDFhNTE5OGUiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.DPS9hLIaykSx9V9SwXsOhWgWQ7nk8MtTyumcWlbYamM";
  const { playlist, isLoading } = useSelector((store) => store.playlist);
  const dispatch1 = useDispatch();
  const deletePlaylist = async (id) => {
    try {
      const postData = await fetch(`/api/user/playlists/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      });
      if (postData.status === 200) {
        const convertedJSON = await postData.json();
        dispatch1(deletePlaylistReducer({ value: convertedJSON.playlists }));
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
    } catch {}
  };
  const deleteVideoPlaylist = async (playListId, videoId) => {
    try {
      const deleteData = await fetch(
        `/api/user/playlists/${playListId}/${videoId}`,
        {
          method: "DELETE",
          headers: {
            authorization: token,
          },
        }
      );
      if (deleteData.status === 200) {
        const convertedJSON = await deleteData.json();
        const getData = await fetch("/api/user/playlists", {
          method: "GET",
          headers: {
            authorization: token,
          },
        });
        const convertedJSON2 = await getData.json();
        // dispatch({
        //   type: "playlistData",
        //   payload: { value: convertedJSON2.playlists },
        // });
        dispatch1(
          deletePlaylistVideoReducer({ value: convertedJSON2.playlists })
        );
        toast.success("Video Deleted Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } catch {}
  };
  useEffect(() => {
    dispatch1(getPlaylistData23(token));
  }, []);
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
      {playlist.length > 0 ? (
        playlist.map((item) => {
          return (
            <React.Fragment key={item.videos}>
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
                        <div
                          className="playlist-video-card-container-2"
                          key={_id}
                        >
                          <Link to={`/video/${_id}`}>
                            <div className="video-img-container">
                              <img src={thumbnail} className="video-img" />
                              <span className="video-duration-badge">
                                {duration}
                              </span>
                            </div>
                            <div className="video-content-container-playlist">
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
                          <button
                            className="btn btn-primary-outline btn-playlist"
                            onClick={() => deleteVideoPlaylist(item._id, _id)}
                          >
                            Delete Video
                          </button>
                        </div>
                      );
                    }
                  )}
                </main>
              </main>
            </React.Fragment>
          );
        })
      ) : (
        <h1 className="center-align">No playlist found</h1>
      )}
    </>
  );
};

export default Playlist;
