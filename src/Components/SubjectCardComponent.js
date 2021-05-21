import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function SubjectCardComponent(props) {
  const meetURL = "";
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "auth-token": localStorage.getItem("jwtToken"),
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer" // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function sendUserInfo(role, userName, userId, classroomId) {
    let encodedString = window.btoa(
      role + "+" + userName + "+" + userId + "+" + classroomId
    );
    postData(meetURL + "/" + encodedString).then((data) => {
      //console.log(studentData); // JSON data parsed by `data.json()` call
    });
    console.log("encoded String is " + encodedString);
  }
  const { card_color } = useContext(UserContext);
  return (
    <>
      <Card
        style={{
          backgroundColor: card_color,
          color: "white"
        }}
        className="sub-card"
      >
        <Card.Body>
          <Card.Title>{props.subject}</Card.Title>
          <Card.Subtitle className="mb-2 ">Timing</Card.Subtitle>
          <Card.Subtitle className="mb-2 ">Teacher Name</Card.Subtitle>
          {props.classState ? (
            <Button
              onClick={() => {
                sendUserInfo(
                  "Attendee",
                  localStorage.getItem("dataPayloadDisplayname"),
                  localStorage.getItem("dataPayloadUsername"),
                  props.classroomID
                );
              }}
              disabled={false}
              variant="success"
              block
            >
              Join Class
            </Button>
          ) : (
            <Button disabled={true} variant="light" block>
              Not Started
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
