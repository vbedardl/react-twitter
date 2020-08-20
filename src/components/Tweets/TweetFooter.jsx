import React from "react";

export default function TweetFooter(props) {
  const footerStyle = { backgroundColor: "white" };
  return (
    <div
      className="card-footer text-muted d-flex justify-content-between"
      style={footerStyle}
    >
      <span onClick={props.onClick}>
        <i class="far fa-comment"></i>
      </span>
      {props.user &&
        props.user.likedTweet &&
        props.user.likedTweet.includes(props.tweet_id) && (
          <span onClick={props.dislikeTweet}>
            <i class="fas fa-thumbs-up"></i> {props.likes}
          </span>
        )}
      {props.user &&
        props.user.likedTweet &&
        !props.user.likedTweet.includes(props.tweet_id) && (
          <span onClick={props.likeTweet}>
            <i class="far fa-thumbs-up"></i> {props.likes}
          </span>
        )}

      <span onClick={() => console.log("share")}>
        <i class="fas fa-retweet"></i>
      </span>
    </div>
  );
}
