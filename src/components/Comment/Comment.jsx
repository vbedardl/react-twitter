import React from "react";
import "./comment.css";

export default function Comments(props) {
  const cardStyle = {
    padding: "0",
    backgroundColor: "rgba(0,0,0,.03)",
    borderRadius: "20px",
  };
  return (
    <div className="card-body mb-1" style={cardStyle}>
      <div>
        <img
          className="img-bordered-primary img-circle m-2"
          height="35px"
          src={props.profile_image}
          alt=""
        />
        <span className="col-12">{props.name}</span>
      </div>
      <div className="col-12">{props.content}</div>
    </div>
  );
}
