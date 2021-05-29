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

          {props.classState ? (
            <Button
              className="btn-rose-dark"
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
            <Button
              className="btn-rose-dark"
              disabled={true}
              variant="light"
              block
            >
              Not Started
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
