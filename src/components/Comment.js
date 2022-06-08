import React from "react";

const Comment = () => {
  return (
    <article className="comment-container">
      <input
        type="text"
        placeholder="add your comment here"
        className="comment-input"
      />
      <button className="btn btn-primary">Add Comment</button>
    </article>
  );
};

export default Comment;
