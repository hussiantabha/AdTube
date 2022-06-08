import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DisplaySidebarVideo = () => {
  const { videos } = useSelector((store) => store.video);
  return (
    <main className="sidebar-displayVideo">
      {videos.length > 0 ? (
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
              <Link to={`/video/${_id}`}>
                <div key={_id} className="siderbar-display-video-container">
                  <div>
                    <img
                      src={thumbnail}
                      className="sidebar-display-container"
                    />
                  </div>
                  <div className="sidebar-display-content-container">
                    <p>{title}</p>
                    <span>{creator}</span>
                    <span>{`${views} views . ${uploaded}`}</span>
                  </div>
                </div>
              </Link>
            );
          }
        )
      ) : (
        <h1>Loading....</h1>
      )}
    </main>
  );
};

export default DisplaySidebarVideo;
