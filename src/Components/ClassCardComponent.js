import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
export default function ClassCardComponent(props) {
  const { card_color } = useContext(UserContext);
  return (
    <>
      <Card
        style={{ backgroundColor: card_color, color: "white" }}
        className="sub-card"
      >
        <Card.Body>
          <Card.Title>
            {props.semester} - {props.section}
          </Card.Title>
          <Card.Subtitle className="mb-2 ">Subject</Card.Subtitle>
          <Button variant="light" block>
            Start Class
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
