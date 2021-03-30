import { Col, Container, Row, Button } from "react-bootstrap";
import SubjectCardComponent from "./SubjectCardComponent";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
export default function StudentPage() {
  const { background_color } = useContext(UserContext);
  return (
    <Container style={{ backgroundColor: background_color }}>
      <Row>
        {["Sub1", "Sub2", "Sub3"].map((subjectName) => {
          return (
            <Col md={4}>
              <SubjectCardComponent subject={subjectName} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
