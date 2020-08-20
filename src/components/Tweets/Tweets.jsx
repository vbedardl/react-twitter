import React, { useState } from "react";
import TweetFooter from "./TweetFooter";
import CommentSection from "../Comment/CommentSection";
import axios from "axios";

export default function Tweets(props) {
  const [commentVisible, setCommentVisible] = useState(false);

  const toggleComment = () => {
    commentVisible ? setCommentVisible(false) : setCommentVisible(true);
  };

  const likeTweet = () => {
    axios
      .post(`/api/like/${props.tweet_id}`)
      .then((res) => {
        const updatedTweet = props.tweetData.map((elm) => {
          if (elm.id === props.tweet_id) {
            elm.likes++;
            return elm;
          } else {
            return elm;
          }
        });
        props.setTweetData(updatedTweet);
        props.setLikeData([...props.likeData, res.data.data]);
      })
      .catch((e) => console.log("did not like"));
  };

  const dislikeTweet = () => {
    axios
      .delete(`/api/like/${props.tweet_id}`)
      .then((res) => {
        const tweetRemoved = res.data.data;
        const updatedTweet = props.tweetData.map((elm) => {
          if (elm.id === props.tweet_id) {
            elm.likes--;
            return elm;
          } else {
            return elm;
          }
        });
        props.setTweetData(updatedTweet);
        const filteredLikeData = props.likeData.filter((elm) => {
          return elm.id !== tweetRemoved.id;
        });
        props.setLikeData(filteredLikeData);
      })
      .catch((e) => console.log("did not dislike"));
  };

  const follow = () => {
    axios
      .post(`/api/follow/${props.owner_id}`)
      .then((res) => {
        const newFollowingData = [...props.followingData];
        newFollowingData.push(res.data.data);
        props.setFollowingData(newFollowingData);
      })
      .catch((e) => console.log("did not follow"));
  };

  const unfollow = () => {
    axios
      .delete(`/api/follow/${props.owner_id}`)
      .then((res) => {
        const followRemoved = res.data.data;
        const filteredFollowData = props.followingData.filter((elm) => {
          return elm.id !== followRemoved.id;
        });
        props.setFollowingData(filteredFollowData);
      })
      .catch((e) => console.log("did not unfollow"));
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
        {props.activeUser.name !== props.name &&
          props.activeUser.userFollows &&
          !props.activeUser.userFollows.includes(props.owner_id) && (
            <div
              className="btn btn-outline-success my-2  mr-2"
              onClick={follow}
            >
              Follow
            </div>
          )}
        {props.activeUser.name !== props.name &&
          props.activeUser.userFollows &&
          props.activeUser.userFollows.includes(props.owner_id) && (
            <div
              className="btn btn-outline-success my-2  mr-2"
              onClick={unfollow}
            >
              Unfollow
            </div>
          )}
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
          dislikeTweet={dislikeTweet}
          tweet_id={props.tweet_id}
          onClick={() => toggleComment()}
          likes={props.likes}
          user={props.activeUser}
          loggedIn={props.loggedIn}
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
