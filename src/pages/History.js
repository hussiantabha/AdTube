import React, { useState, useEffect, useContext } from "react";
import NormalNavbar from "../components/NormalNavbar";
import { VideoContext } from "../context/Data";
import { Link } from "react-router-dom";

const History = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjVkM2MzNy01MjcwLTQ5NjgtODQ0MC1iZTM3ZDFhNTE5OGUiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.DPS9hLIaykSx9V9SwXsOhWgWQ7nk8MtTyumcWlbYamM";
  const { videoState, dispatch } = useContext(VideoContext);
  const getHistoryData = async () => {
    const getData = await fetch("/api/user/history", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const convertedJSON = await getData.json();
    console.log(convertedJSON);
    dispatch({
      type: "historyVideos",
      payload: { value: convertedJSON.history },
    });
  };
  const deleteHistoryVideo = async (id) => {
    try {
      const deleteData = await fetch(`/api/user/history/${id}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      });
      if (deleteData.status === 200) {
        const convertedJSON = await deleteData.json();
        dispatch({
          type: "historyVideos",
          payload: { value: convertedJSON.history },
        });
      }
    } catch {}
  };
  const clearAllHistoryVideos = async () => {
    const deleteData = await fetch("/api/user/history/all", {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    if (deleteData.status === 200) {
      const convertedJSON = await deleteData.json();
      dispatch({
        type: "historyVideos",
        payload: { value: convertedJSON.history },
      });
    }
  };
  useEffect(() => {
    getHistoryData();
  }, []);
  return (
    <>
      <NormalNavbar />
      <main className="playlist-container">
        <div className="playlist-top-container">
          {videoState.history.length > 0 ? (
            <h2>History </h2>
          ) : (
            <h2>No History</h2>
          )}
          <button
            className="btn btn-primary-outline"
            onClick={() => clearAllHistoryVideos()}
          >
            Clear All
          </button>
        </div>
        <section className="playlist-video-card-container">
          {videoState.history.map(
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
                    className="btn btn-primary-outline btn-video-align"
                    onClick={() => deleteHistoryVideo(_id)}
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

export default History;
