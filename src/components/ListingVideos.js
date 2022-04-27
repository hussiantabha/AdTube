import React, { useContext } from "react";
import { VideoContext } from "../context/Data";
import { Link } from "react-router-dom";

const ListingVideos = () => {
  const { videoState, dispatch } = useContext(VideoContext);
  console.log(videoState);
  return (
    <main className="main">
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
            <div className="video-card-container">
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
            </div>
          );
        }
      )}
    </main>
  );
};

export default ListingVideos;
