import React, { useState } from "react";

export default function CommentForm(props) {
  const [commentText, setCommentText] = useState("");

  const writtingEvent = (event) => {
    setCommentText(event.target.value);
  };

  const createNewComment = (event) => {
    event.preventDefault();
    const data = {
      tweet_id: props.tweet_id,
      content: commentText,
    };
    setCommentText("");
    props.createComment(data);
  };
  return (
    <form onSubmit={createNewComment} className="row ml-1 mr-1">
      <textarea
        className="form-control col-10"
        rows="1"
        name="text"
        placeholder="Comment away..."
        onChange={writtingEvent}
        value={commentText}
      >
        {commentText}
      </textarea>
      <button className="btn btn-outline-primary col-2">→</button>
    </form>
  );
}
