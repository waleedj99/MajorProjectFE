import {
  Card,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
export default function ClassCardComponent(props) {
  const { card_color } = useContext(UserContext);
  const [selectedCourse, setSelectedCourse] = useState("Course");
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
          <Card.Title>{props.semsection}</Card.Title>
          <Card.Subtitle className="mb-2 ">Subject</Card.Subtitle>
          <Row>
            <Col>
              <Button variant="light" block>
                Start Class
              </Button>
            </Col>
            <Col>
              <DropdownButton id="dropdown-basic-button" title={selectedCourse}>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedCourse("Course1");
                  }}
                >
                  Course 1
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedCourse("Course2");
                  }}
                >
                  Course 2
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedCourse("Course3");
                  }}
                >
                  Course 3
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
