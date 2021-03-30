import React, { Component, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

function LoginForm() {
  const [userPassword, setUserPassword] = useState("1ds17cs800");
  const [userName, setUserName] = useState("qqqqqqqq");
  const [getTokenFlag, setTokenFlag] = useState(false);

  async function postData(
    url = "https://majorprojectzoom.herokuapp.com/api/auth/login",
    data = {}
  ) {
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
    return response.json(); // parses JSON response into native JavaScript objects
  }
  async function getLoginToken(userName, userPassword) {
    postData("https://example.com/answer", {
      username: userName,
      password: userPassword
    }).then((data) => {
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
      <Button
        onClick={() => getLoginToken(userName, userPassword)}
        variant="primary"
      >
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
