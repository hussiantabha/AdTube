import React, { useState, useEffect, useContext } from "react";
import { VideoContext } from "../context/Data";
import NormalNavbar from "../components/NormalNavbar";
import { BiLike } from "react-icons/bi";
import { useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DisplayVideo = () => {
  const { videoState, dispatch } = useContext(VideoContext);
  const [playlist, setPlaylist] = useState("");
  const [allPlaylist, setAllPlayist] = useState([]);
  const [video, setVideo] = useState({});
  const [playlistModal, setPlaylistModal] = useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjVkM2MzNy01MjcwLTQ5NjgtODQ0MC1iZTM3ZDFhNTE5OGUiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.DPS9hLIaykSx9V9SwXsOhWgWQ7nk8MtTyumcWlbYamM";
  const param = useParams();
  const getVideo = async () => {
    const getData = await fetch(`/api/video/${param.videoId}`);
    const convertedJSON = await getData.json();
    setVideo(convertedJSON.video);
  };

  const findPlaylist = async () => {
    try {
      const getData = await fetch("/api/user/playlists", {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
      const convertedJSON = await getData.json();
      dispatch({
        type: "playlistData",
        payload: { value: convertedJSON.playlists },
      });
    } catch {}
  };
  const postPlaylist = async () => {
    try {
      const postData = await fetch("/api/user/playlists", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          playlist: {
            title: playlist,
          },
        }),
      });
      const getData = await fetch("/api/user/playlists", {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
      const convertedJSON = await getData.json();
      const filtered = await convertedJSON.playlists.filter(
        (item) => item.title === playlist
      );
      const postData2 = await fetch(`/api/user/playlists/${filtered[0]._id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          video,
        }),
      });
      if (postData2.status === 201) {
        toast.success("Added Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      setPlaylist("");
      setPlaylistModal(false);
    } catch {}
  };
  const addVideoToPlaylist = async () => {
    try {
      allPlaylist.map((item) => {
        const playlistVideoState = videoState.playlist.filter(
          (element) => element.title === item
        );
        const innerFunc = async () => {
          const postData = await fetch(
            `/api/user/playlists/${playlistVideoState[0]._id}`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                authorization: token,
              },
              body: JSON.stringify({
                video,
              }),
            }
          );
          if (postData.status === 201) {
            toast.success("Added Successfully", {
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
        innerFunc();
        return;
      });
      setPlaylistModal(false);
    } catch {}
  };
  useEffect(() => {
    findPlaylist();
  });

  useEffect(() => {
    getVideo();
  }, [param.videoId]);
  const likeVideo = async (video) => {
    try {
      const postData = await fetch(`/api/user/likes`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          video,
        }),
      });
      if (postData.status === 201) {
        const convertedJSON = await postData.json();
        dispatch({
          type: "likedVideos",
          payload: { value: convertedJSON.likes },
        });
        toast.success("Added Successfully", {
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
  const removeLike = async (video) => {
    try {
      const deleteData = await fetch(`/api/user/likes/${video._id}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      });
      if (deleteData.status === 200) {
        const convertedJSON = await deleteData.json();
        dispatch({
          type: "likedVideos",
          payload: { value: convertedJSON.likes },
        });
      }
    } catch {}
  };
  const addWatchLater = async (video) => {
    try {
      const postData = await fetch("/api/user/watchlater", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          video,
        }),
      });
      if (postData.status === 201) {
        const convertedJSON = await postData.json();
        dispatch({
          type: "watchLaterVideos",
          payload: { value: convertedJSON.watchlater },
        });
        toast.success("Added Successfully", {
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
  const addToHistory = async () => {
    const getData = await fetch(`/api/video/${param.videoId}`);
    const convertedJSON1 = await getData.json();
    const postData = await fetch("/api/user/history", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        video: convertedJSON1.video,
      }),
    });
    const convertedJSON = await postData.json();
    console.log(convertedJSON);
  };
  useEffect(() => {
    getVideo();
    addToHistory();
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
      <div className={playlistModal ? "playlist-modal" : "playlist-modal-hide"}>
        <h3>Create Playlist</h3>
        <div className="playlist-modal-top-container">
          <input
            type="text"
            onChange={(e) => setPlaylist(e.target.value)}
            value={playlist}
            className="playlist-input"
          />
          <button className="btn-modal" onClick={postPlaylist}>
            Add
          </button>
        </div>
        {videoState.playlist.map((element) => {
          return (
            <div className="individual-playlist" key={element.title}>
              <input
                type="checkbox"
                value={element.title}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAllPlayist((prev) => [...prev, e.target.value]);
                  } else {
                    setAllPlayist(
                      allPlaylist.filter((item) => item !== e.target.value)
                    );
                  }
                }}
                name={element.title}
              />
              <p>{element.title}</p>
            </div>
          );
        })}
        <button className="btn-modal-fullWidth" onClick={addVideoToPlaylist}>
          Add To Playlist
        </button>
      </div>
      <section className="main-sidebar-flex">
        <main>
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src={video.video_url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen="1"
              className="video-iframe"
            ></iframe>

            <div className="video-container-content">
              <h2>{video.title}</h2>
              <div className="video-container-icons">
                <div>
                  <h5>{`${video.views} . ${video.uploadedDate}`}</h5>
                </div>
                <div>
                  <div className="video-icon">
                    {videoState.likedVideos.filter(
                      (item) => item.id === video.id
                    ).length === 1 ? (
                      <button
                        onClick={() => removeLike(video)}
                        className="btn btn-primary btn-like"
                      >
                        Liked
                      </button>
                    ) : (
                      <button
                        onClick={() => likeVideo(video)}
                        className="btn btn-primary-outline btn-like"
                      >
                        <BiLike /> Like
                      </button>
                    )}
                    <button
                      className="btn btn-primary-outline"
                      onClick={() => {
                        setPlaylistModal((prev) => !prev);
                      }}
                    >
                      Add to Playlist
                    </button>
                    <button
                      className="btn btn-primary-outline"
                      onClick={() => addWatchLater(video)}
                    >
                      Watch Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <section className="sidebar-video-card-container">
          {videoState.data.map(
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
                <div className="sidebar-video-card">
                  <div className="sidebar-video-img-container">
                    <img src={thumbnail} className="sidebar-video-img" />
                  </div>

                  <div className="sidebar-video-content-container">
                    <h3 className="sidebar-title">{title}</h3>
                    <span className="sidbar-small-text">{creator}</span>
                    <span>{`${views}. ${uploaded}`}</span>
                  </div>
                </div>
              );
            }
          )}
        </section>
      </section>
    </>
  );
};

export default DisplayVideo;
