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

export default function LoginForm(props) {
  const [error, setError] = useState("");

  const email = useForm();
  const password = useForm();

  const logingin = (event) => {
    event.preventDefault();
    if (email.value && password.value) {
      const registerObject = {
        email: email.value,
        password: password.value,
      };

      axios
        .post("/api/login", registerObject)
        .then((data) => {
          if (data.data) {
            setError("");
            props.setLoggedIn(true);
            props.setUser(data.data.user);
          } else {
            setError("Sorry, those credentials are invalid");
          }
        })
        .catch((e) => {
          console.log("still didnt pass");
          setError("Sorry, those credentials are invalid");
        });
    } else {
      setError("Sorry, those credentials are invalid");
    }
  };

  return (
    <div className="card m-3">
      <section className="new-tweet hidden">
        <h2 className="m-1">Login</h2>
        {error && <div className="alert alert-warning mx-auto ">{error}</div>}

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
              {" "}
              Log in
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
