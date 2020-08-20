import React from "react";
import { useState } from "react";

import axios from "axios";

function useForm() {
  const [value, setValue] = useState("");

  const onChangeValue = (event) => {
    setValue(event.target.value);
  };
  const clear = () => {
    setValue("");
  };
  return { value, onChangeValue, clear };
}

export default function RegistrationForm(props) {
  const [error, setError] = useState("");

  const name = useForm();
  const email = useForm();
  const password = useForm();

  const register = (event) => {
    event.preventDefault();
    if (name.value && email.value && password.value) {
      const registerObject = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      axios
        .post("/api/register", registerObject)
        .then((res) => {
          if (res.data) {
            setError("");
            props.setLoggedIn(true);
            props.setUser({ ...res.data.data, likedTweet: [] });
          } else {
            setError("Sorry, this email is taken");
          }
        })
        .catch((e) => console.log(e));
    } else {
      setError("Sorry, all the field are required");
    }
  };

  return (
    <div className="card m-3">
      <section className="new-tweet hidden">
        <h2>Register</h2>
        {error && (
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={register}>
          <div className="form-group input-group">
            <input
              name="name"
              className="form-control"
              placeholder="Full name"
              type="text"
              onChange={name.onChangeValue}
              value={name.value}
            />
          </div>
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
              Sign up
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
