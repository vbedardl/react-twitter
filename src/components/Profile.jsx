import React from "react";
import "./Profile.css";

export default function Profile(props) {
  return (
    <div className="profile">
      <h2>{props.loggedIn ? `Hi  ${props.user}` : "Welcome to tweeter"}</h2>
      {props.loggedIn && (
        <button className="btn btn-success mt-3" onClick={props.toggleForm}>
          {props.formVisible ? "Cancel my Tweet" : "Create a new Tweet"}
        </button>
      )}
    </div>
  );
}
