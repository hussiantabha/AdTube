import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { BiLike } from "react-icons/bi";
import { VideoContext } from "../context/Data";
const DisplayVideo = () => {
  const [video, setVideo] = useState({});
  const { videoState } = useContext(VideoContext);
  const { videoId } = useParams();
  const url = `/api/video/${videoId}`;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMzAyOTRlOS05NzFiLTQxYTQtYmY2Ny04MDU3YjJhYmIwNTUiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.cz0FYZb3tlsVRwm38QKhsGIs9Ovn5UTk3_fttTrU9G8";
  useEffect(async () => {
    const response = await fetch(url);
    const convertedJSON = await response.json();
    setVideo(convertedJSON.video);
  });
  const likeVideo = async (video) => {
    const postData = await fetch("/api/user/likes", {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({
        video,
      }),
    });
    if (postData.status === 201) {
      const convertedJSON = await postData.json();
      console.log(convertedJSON);
    }
    if (postData.status === 409) {
      console.log("Already in Liked Videos");
    }
  };
  return (
    <>
      <Navbar />
      <section className="video-section-2">
        <section>
          <main>
            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src={video.video_url}
                title="YouTube video player"
                frameborder="0"
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
                      <button onClick={() => likeVideo(video)}>
                        <BiLike /> Like
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
        <main>
          <section className="sidebar-video-card-container">
            {videoState.data.map(
              ({ title, thumbnail, creator, views, uploaded, _id }) => {
                return (
                  <>
                    <div className="sidebar-video-card">
                      <Link to={`/video/${_id}`}>
                        <div className="sidebar-video-img-container">
                          <img src={thumbnail} className="sidebar-video-img" />
                        </div>
                        <div className="sidebar-video-content-container">
                          <h4>{title}</h4>
                          <span>{creator}</span>
                          <div>
                            <span>{`${views} views . ${uploaded} `}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                );
              }
            )}
          </section>
        </main>
      </section>
    </>
  );
};
// `/api/video/${videoId}`;
export default DisplayVideo;
