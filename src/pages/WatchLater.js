import React, { useContext, useEffect, useState } from "react";
import NormalNavbar from "../components/NormalNavbar";
import { VideoContext } from "../context/Data";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWatchLaterReducer,
  getWatchLaterVideos,
} from "../features/watchLater";
const WatchLater = () => {
  const dispatch1 = useDispatch();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjVkM2MzNy01MjcwLTQ5NjgtODQ0MC1iZTM3ZDFhNTE5OGUiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.DPS9hLIaykSx9V9SwXsOhWgWQ7nk8MtTyumcWlbYamM";
  const deleteWatchLaterVideo = async (id) => {
    try {
      const deleteData = await fetch(`/api/user/watchlater/${id}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      });
      if (deleteData.status === 200) {
        const convertedJSON = await deleteData.json();
        dispatch1(deleteWatchLaterReducer({ value: convertedJSON.watchlater }));
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
    } catch (error) {
      console.log(error);
    }
  };
  const { watchLaterVideos } = useSelector((store) => store.watchLater);
  useEffect(() => {
    dispatch1(getWatchLaterVideos(token));
  }, []);
  console.log(watchLaterVideos);
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
      <main className="playlist-container">
        <div className="playlist-top-container">
          {watchLaterVideos.length > 0 ? (
            <h2>Watch Later Videos</h2>
          ) : (
            <h2>No Watch Later Videos</h2>
          )}
        </div>
        <section className="playlist-video-card-container">
          {watchLaterVideos.map(
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
                <div className="video-card-container" key={_id}>
                  <Link to={`/video/${_id}`}>
                    <div className="video-img-container">
                      <img src={thumbnail} className="video-img" />
                      <span className="video-duration-badge">{duration}</span>
                    </div>
                    <div className="video-content-container">
                      <img src={avatar_url} className="creator-avatar" />
                      <div className="video-text-container">
                        <h3>{title}</h3>
                        <p>{creator}</p>
                        <p>{`${views} views . ${uploaded}`}</p>
                      </div>
                    </div>
                  </Link>
                  <button
                    className="btn btn-primary-outline"
                    onClick={() => deleteWatchLaterVideo(_id)}
                  >
                    Delete
                  </button>
                </div>
              );
            }
          )}
        </section>
      </main>
    </>
  );
};

export default WatchLater;
