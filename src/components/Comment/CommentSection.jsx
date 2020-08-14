import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

export default function CommentSection(props) {
  const commentMapping = props.comments.map((comment) => {
    return (
      <Comment
        content={comment.content}
        name={comment.name}
        profile_image={comment.profile_image}
      />
    );
  });

  return (
    <section>
      {commentMapping}
      <CommentForm
        tweet_id={props.tweet_id}
        createComment={props.createComment}
      />
    </section>
  );
}
