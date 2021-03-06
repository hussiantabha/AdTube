import React, { useContext, useEffect } from "react";
import { VideoContext } from "../context/Data";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getVideos } from "../features/video";

const ListingVideos = () => {
  const dispatch1 = useDispatch();
  const { videos, isLoading } = useSelector((store) => store.video);
  useEffect(() => {
    dispatch1(getVideos());
  }, []);
  return (
    <main className="main">
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        videos.map(
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
              </div>
            );
          }
        )
      )}
    </main>
  );
};

export default ListingVideos;
