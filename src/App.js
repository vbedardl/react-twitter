import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Profile from "./components/Profile";
import TweetForm from "./components/Tweets/TweetForm";
import Tweets from "./components/Tweets/Tweets";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import { selectorComment, finalUserObject } from "./helpers/selector";
import { chrono } from "./helpers/helper-functions";

function App() {
  const [state, setState] = useState({
    tweetData: [],
    commentData: [],
    likeData: [],
    followingData: [],
    formVisible: false,
    loggedIn: false,
    loginFormVisible: false,
    registerFormVisible: false,
    error: "",
    user: {},
  });
  const setTweetData = (tweetData) =>
    setState((prev) => ({ ...prev, tweetData }));
  const setLikeData = (likeData) => setState((prev) => ({ ...prev, likeData }));
  const setCommentData = (commentData) =>
    setState((prev) => ({ ...prev, commentData }));
  const setFormVisible = (formVisible) =>
    setState((prev) => ({ ...prev, formVisible }));
  const setLoggedIn = (loggedIn) => setState((prev) => ({ ...prev, loggedIn }));
  const setLoginFormVisible = (loginFormVisible) =>
    setState((prev) => ({ ...prev, loginFormVisible }));
  const setRegisterFormVisible = (registerFormVisible) =>
    setState((prev) => ({ ...prev, registerFormVisible }));
  const setUser = (user) => setState((prev) => ({ ...prev, user }));
  const setError = (error) => setState((prev) => ({ ...prev, error }));
  const setFollowingData = (followingData) =>
    setState((prev) => ({ ...prev, followingData }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/tweets"),
      axios.get("/api/comments"),
      axios.get("/api/like"),
      axios.get("/api/followings"),
    ]).then((all) => {
      setTweetData(all[0].data.data.reverse());
      setCommentData(all[1].data.data);
      setLikeData(all[2].data.data);
      setFollowingData(all[3].data.data);
    });
  }, []);

  useEffect(() => {
    setUser(finalUserObject(state.user, state));
  }, [state.likeData, state.followingData]);

  const toggleForm = () => {
    state.formVisible ? setFormVisible(false) : setFormVisible(true);
  };
  const tweets = state.tweetData.map((tweet) => {
    const comments = selectorComment(tweet.id, state.commentData);
    const createdAt = chrono(
      Date.now() - new Date(tweet.creation_date).getTime()
    );
    return (
      <Tweets
        tweet_id={tweet.id}
        name={tweet.name}
        owner_id={tweet.owner_id}
        handle={tweet.handle}
        date={tweet.date}
        text={tweet.text}
        profile_image={tweet.profile_image}
        comments={comments}
        createComment={createComment}
        loggedin={state.loggedIn}
        created_at={createdAt}
        activeUser={state.user}
        likes={tweet.likes}
        setTweetData={setTweetData}
        tweetData={state.tweetData}
        setLikeData={setLikeData}
        likeData={state.likeData}
        followingData={state.followingData}
        setFollowingData={setFollowingData}
      />
    );
  });

  const toggleLogin = () => {
    if (state.loginFormVisible) {
      setLoginFormVisible(false);
    } else {
      setRegisterFormVisible(false);
      setLoginFormVisible(true);
    }
  };
  const toggleRegister = () => {
    if (state.registerFormVisible) {
      setRegisterFormVisible(false);
    } else {
      setLoginFormVisible(false);
      setRegisterFormVisible(true);
    }
  };

  const loggingOut = () => {
    setLoginFormVisible(false);
    setRegisterFormVisible(false);
    setFormVisible(false);
  };

  const loginRequest = (registerObject) => {
    return axios.post("/api/login", registerObject);
  };
  const addNewTweet = (text) => {
    const serverTweet = {
      owner_id: state.user.id,
      content: text,
    };
    const newTweet = {
      name: state.user.name,
      handle: state.user.email,
      profile_image: "https://i.imgur.com/nlhLi3I.png",
      text,
    };
    axios.post("/api/tweets", serverTweet).then((res) => {
      setTweetData([newTweet, ...state.tweetData]);

      console.log(res);
    });
  };

  function createComment(data) {
    const newComment = {
      content: data.content,
      tweet_id: data.tweet_id,
      owner_id: state.user.id,
      name: state.user.name,
      profile_image: "https://i.imgur.com/nlhLi3I.png",
    };
    axios.post("/api/comments", newComment).then((res) => {
      setCommentData([...state.commentData, newComment]);
    });
  }

  return (
    <div className="App">
      <Header
        loggingOut={loggingOut}
        toggleLogin={toggleLogin}
        toggleRegister={toggleRegister}
        loggedIn={state.loggedIn}
        setUser={setUser}
        setLoggedIn={setLoggedIn}
      />
      <Profile
        toggleForm={toggleForm}
        user={state.user.name}
        loggedIn={state.loggedIn}
        formVisible={state.formVisible}
      />
      {state.loginFormVisible && !state.loggedIn && (
        <LoginForm
          setUser={setUser}
          setLoggedIn={setLoggedIn}
          error={state.error}
          setError={setError}
          loginRequest={loginRequest}
          state={state}
        />
      )}
      {state.registerFormVisible && !state.loggedIn && (
        <RegistrationForm setUser={setUser} setLoggedIn={setLoggedIn} />
      )}
      {state.formVisible && (
        <TweetForm toggleForm={toggleForm} addNewTweet={addNewTweet} />
      )}

      {tweets}
    </div>
  );
}

export default App;
