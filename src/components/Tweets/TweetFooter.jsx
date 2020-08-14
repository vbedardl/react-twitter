import React from "react";
import axios from "axios";

const ActionButton = (props) => {
  return <span onClick={props.onClick}>{props.text}</span>;
};

export default function TweetFooter(props) {
  const footerStyle = { backgroundColor: "white" };
  console.log(props.user);
  return (
    <div
      className="card-footer text-muted d-flex justify-content-between"
      style={footerStyle}
    >
      <ActionButton onClick={props.onClick} text="Comment" />
      {/* {props.user.likedTweet.includes(props.tweet_id) ? (
        <span onClick={props.dislikeTweet}>Liked {props.likes}</span>
      ) : (
        <span onClick={props.likeTweet}>Likes {props.likes}</span>
      )} */}
      <ActionButton onClick={() => console.log()} text="Share" />
    </div>
  );
}
