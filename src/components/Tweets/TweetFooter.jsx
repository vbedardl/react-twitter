import React from "react";

const ActionButton = (props) => {
  return <span onClick={props.onClick}>{props.text}</span>;
};

export default function TweetFooter(props) {
  const footerStyle = { backgroundColor: "white" };
  return (
    <div
      className="card-footer text-muted d-flex justify-content-between"
      style={footerStyle}
    >
      <ActionButton onClick={props.onClick} text="Comment" />
      <ActionButton onClick={() => console.log("Like")} text="Likes" />
      <ActionButton onClick={() => console.log("Share")} text="Share" />
    </div>
  );
}
