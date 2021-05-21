import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function SubjectCardComponent(props) {
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
            <Button disabled={false} variant="success" block>
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
