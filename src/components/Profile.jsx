import React from "react";
import "./Profile.css";

export default function Profile(props) {
  return (
    <div className="profile">
      {props.loggedIn && (
        <div>
          <img src="images/profile-hex.png" width="50%" alt="ss" />
        </div>
      )}
      <h2>{props.loggedIn ? props.user : "Welcome to tweeter"}</h2>
      {props.loggedIn && (
        <button className="btn btn-success" onClick={props.toggleForm}>
          {props.formVisible ? "Cancel my Tweet" : "Create a new Tweet"}
        </button>
      )}
    </div>
  );
}
