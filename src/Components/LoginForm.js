import React, { Component, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
function LoginForm(props) {
  const [userPassword, setUserPassword] = useState("qqqqqqqq");
  const [userName, setUserName] = useState("1ds17cs800");
  const [getTokenFlag, setTokenFlag] = useState(false);

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
    postData(
      "https://cors-anywhere.herokuapp.com/https://majorprojectzoom.herokuapp.com/api/auth/login",
      {
        username: userName,
        password: userPassword
      }
    ).then((data) => {
      props.setLoginToken(data);
      console.log(data); // JSON data parsed by `data.json()` call
    });
  }

  return (
    <Form>
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
      <Link to="/">
        <Button
          onClick={() => getLoginToken(userName, userPassword)}
          variant="primary"
        >
          Submit
        </Button>
      </Link>
    </Form>
  );
}

export default LoginForm;
