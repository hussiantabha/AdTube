import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NormalNavbar from "../components/NormalNavbar";
import { getHistoryData } from "../features/history";
import { Link } from "react-router-dom";
import { deleteHistoryData } from "../features/history";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const History = () => {
  const { historyVideos } = useSelector((store) => store.history);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjVkM2MzNy01MjcwLTQ5NjgtODQ0MC1iZTM3ZDFhNTE5OGUiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.DPS9hLIaykSx9V9SwXsOhWgWQ7nk8MtTyumcWlbYamM";
  const dispatch1 = useDispatch();
  useEffect(() => {
    dispatch1(getHistoryData(token));
  }, []);
  const deleteHistoryVideo = async (id) => {
    const deleteData = await fetch(`/api/user/history/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    if (deleteData.status === 200) {
      const convertedJSON = await deleteData.json();
      dispatch1(deleteHistoryData({ value: convertedJSON.history }));
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
      <main className="playlist-container">
        <div className="playlist-top-container">
          {historyVideos.length > 0 ? (
            <h2>Your Video History</h2>
          ) : (
            <h2>No History Available</h2>
          )}
        </div>
        <section className="playlist-video-card-container">
          {historyVideos.map(
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
                <div className="playlist-video-card-container-2" key={_id}>
                  <Link to={`/video/${_id}`}>
                    <div className="video-img-container">
                      <img src={thumbnail} className="video-img" />
                      <span className="video-duration-badge">{duration}</span>
                    </div>
                    <div className="video-content-container-playlist">
                      <img src={avatar_url} className="creator-avatar" />
                      <div className="video-text-container">
                        <h3>{title}</h3>
                        <p>{creator}</p>
                        <p>{`${views} views . ${uploaded}`}</p>
                      </div>
                    </div>
                  </Link>
                  <button
                    className="btn btn-primary-outline btn-playlist"
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
