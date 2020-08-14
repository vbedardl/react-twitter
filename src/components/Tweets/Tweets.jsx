import React, { useState } from "react";
import TweetFooter from "./TweetFooter";
import CommentSection from "../Comment/CommentSection";
import axios from "axios";
import { userObjectWithNewLike } from "../../helpers/selector";

export default function Tweets(props) {
  const [commentVisible, setCommentVisible] = useState(false);

  const toggleComment = () => {
    commentVisible ? setCommentVisible(false) : setCommentVisible(true);
  };

  const likeTweet = () => {
    axios
      .post("/api/like/", { tweet_id: props.tweet_id })
      .then((res) => {
        const newLikeToTweet = props.tweetData.filter(
          (elm) => elm.id === props.tweet_id
        )[0];
        newLikeToTweet.likes++;

        props.setTweetData([...props.tweetData, newLikeToTweet]);
        props.setUser(userObjectWithNewLike(...props.user, props.tweet_id));
        props.setLikeData([...props.likeData, res.data.data]);
      })
      .catch((e) => console.log("didnt work"));
  };

  return (
    <div className="card m-3">
      <div className="card-header row m-0">
        <img
          className="img-bordered-primary img-circle m-2"
          height="35px"
          src={props.profile_image}
          alt=""
        />
        <span className="align-self-center ml-2">{props.name}</span>
        <div className="mr-auto"></div>
        <div className="btn btn-outline-success my-2  mr-2">
          {props.activeUser.name === props.name ? "Delete" : "Follow"}
        </div>
      </div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{props.text}</p>
          <footer className="blockquote-footer">{props.created_at} </footer>
        </blockquote>
      </div>
      {props.loggedin && (
        <TweetFooter
          likeTweet={likeTweet}
          tweet_id={props.tweet_id}
          onClick={() => toggleComment()}
          likes={props.likes}
          user={props.activeUser}
        />
      )}
      {commentVisible && (
        <CommentSection
          comments={props.comments}
          createComment={props.createComment}
          tweet_id={props.tweet_id}
        />
      )}
    </div>
  );
}
