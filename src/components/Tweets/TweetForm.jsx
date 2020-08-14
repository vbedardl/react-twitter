import React from "react";
import { useState } from "react";
import "./TweetForm.css";

export default function TweetForm(props) {
  const [tweetText, setTweetText] = useState("");
  const [error, setError] = useState("");
  const tweetRemainingLength = 140 - tweetText.length;
  const spanStyle = { color: tweetRemainingLength >= 0 ? "black" : "red" };

  const submitTweet = (event) => {
    event.preventDefault();
    if (tweetRemainingLength >= 0 && tweetRemainingLength < 140) {
      props.addNewTweet(tweetText);
      setTweetText("");
      props.toggleForm();
    } else {
      setError("This tweet is invalid.");
    }
  };

  const writtingEvent = (event) => {
    setTweetText(event.target.value);
    setError("");
  };

  return (
    <section class="new-tweet">
      <h2 class="text-center">Compose Tweet</h2>
      {error && <div class="alert alert-warning mx-auto ">{error}</div>}

      <form class="row" onSubmit={submitTweet}>
        <div class="form-group col-12">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Tweet about something"
            onChange={writtingEvent}
            value={tweetText}
          ></textarea>
          <small style={spanStyle} id="emailHelp" class="form-text text-muted">
            {140 - tweetText.length}
          </small>
        </div>
        <button class="btn btn-outline-success col-12" type="submit">
          Tweet
        </button>
      </form>
    </section>
  );
}
