import React, { Component, useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";

import { Form, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams
} from "react-router-dom";

function LoginRedirection(props) {
  if (props.userType === true) {
    return <Redirect to="/student" />;
  }
  if (props.userType === false) {
    return <Redirect to="/teacher" />;
  } else {
    return <></>;
  }
}

function LoginForm(props) {
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.text(); // parses JSON response into native JavaScript objects
  }

  async function getLoginToken(userName, userPassword) {
    postData("https://majorprojectzoom.herokuapp.com/api/auth/login", {
      username: userName,
      password: userPassword
    })
      .then((data) => {
        console.log(data);
        if (data === "Username is wrong") {
          setUsernameErrorMessage(true);
          return;
        }
        if (data === "Invalid Password") {
          setPasswordErrorMessage(true);
          return;
        }
        data = JSON.parse(data);

        props.setLoginToken(data.token);
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem(
          "dataPayloadDisplayname",
          data.payload.displayname
        );
        localStorage.setItem("dataPayloadUsername", data.payload.username);
        if (data.payload.userType === "Host") {
          console.log("HOSt");
          props.setStudentType(false);

          localStorage.setItem("userType", false);
          return <Redirect to="/teacher" />;
        } else {
          console.log("Atten");
          props.setStudentType(true);
          localStorage.setItem("userType", true);
          return <Redirect to="/student" />;
        }

        // JSON data parsed by `data.json()` call
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <section className="login-dark">
      <LoginRedirection userType={props.userType} />
      <Form>
        <h2>LOGIN</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="Enter Username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button
          onClick={() => {
            setUsernameErrorMessage(false);
            getLoginToken(userName, userPassword);
            setPasswordErrorMessage(false);
          }}
          variant="primary"
        >
          Submit
        </Button>
        {usernameErrorMessage ? <sub>Wrong Username</sub> : <></>}
        {passwordErrorMessage ? <sub>Wrong Password</sub> : <></>}
      </Form>
    </section>
  );
}

export default LoginForm;
