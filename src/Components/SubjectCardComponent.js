import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function SubjectCardComponent(props) {
  const { webRTC_URL, card_color } = useContext(UserContext);
  async function sendUserInfo(role, userName, userId, classroomId) {
    let encodedString = window.btoa(
      role + "+" + userName + "+" + userId + "+" + classroomId
    );
    window.open(webRTC_URL + encodedString);
    console.log("encoded String is " + encodedString);
  }

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
