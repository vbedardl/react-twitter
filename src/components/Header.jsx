import React from "react";
import Axios from "axios";

export default function Header(props) {
  const logout = () => {
    Axios.post("/api/logout")
      .then((res) => {
        props.setUser({});
        props.setLoggedIn(false);
        props.loggingOut();
      })
      .catch((e) => null);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Logo
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        {props.loggedIn ? (
          <div
            className="btn btn-outline-success my-2 my-sm-0 mr-2"
            onClick={() => logout()}
          >
            Logout
          </div>
        ) : (
          <>
            <div
              className="btn btn-outline-success my-2 my-sm-0 mr-2"
              onClick={props.toggleLogin}
            >
              Login
            </div>
            <div
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={props.toggleRegister}
            >
              Register
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
