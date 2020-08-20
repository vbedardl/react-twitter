import React from "react";
import { finalUserObject } from "../helpers/selector";
import { useForm } from "../hooks/useForm";

export default function LoginForm(props) {
  const email = useForm();
  const password = useForm();

  const logingin = (event) => {
    event.preventDefault();
    if (email.value && password.value) {
      const registerObject = {
        email: email.value,
        password: password.value,
      };

      props.loginRequest(registerObject).then((data) => {
        if (data.data) {
          props.setError("");
          props.setLoggedIn(true);
          props.setUser(finalUserObject(data.data.user, props.state));
          return;
        } else {
          props.setError("Sorry, those credentials are invalid");
          return;
        }
      });
    } else {
      props.setError("Here Sorry, those credentials are invalid");
    }
  };

  return (
    <div className="card m-3">
      <section className="new-tweet hidden">
        <h2 className="m-1">Login</h2>
        {props.error && (
          <div className="alert alert-warning mx-auto ">{props.error}</div>
        )}

        <form onSubmit={logingin} className="m-2">
          <div className="form-group input-group">
            <input
              name="email"
              className="form-control"
              placeholder="Enter email"
              type="email"
              id="email"
              onChange={email.onChangeValue}
              value={email.value}
            />
          </div>
          <div className="form-group input-group">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              placeholder="Create Password"
              onChange={password.onChangeValue}
              value={password.value}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Log in
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
