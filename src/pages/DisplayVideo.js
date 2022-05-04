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
  };
  const postPlaylist = async () => {
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
  };
  const addVideoToPlaylist = async () => {
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
  };
  useEffect(() => {
    findPlaylist();
  });
  useEffect(() => {
    getVideo();
  }, []);
  useEffect(() => {
    getVideo();
  }, [param.videoId]);
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
      <section>
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
                    <button
                      onClick={() => likeVideo(video)}
                      className="btn btn-primary-outline btn-like"
                    >
                      <BiLike /> Like
                    </button>
                    <button
                      className="btn btn-primary-outline"
                      onClick={() => {
                        setPlaylistModal((prev) => !prev);
                      }}
                    >
                      Add to Playlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default DisplayVideo;
