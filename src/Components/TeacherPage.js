import { Col, Container, Row, Button } from "react-bootstrap";
import ClassCardComponent from "./ClassCardComponent";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
export default function TeacherPage() {
  const { background_color } = useContext(UserContext);
  return (
    <Container style={{ backgroundColor: background_color }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
        return (
          <Row id={"sem-" + sem}>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
              md={1}
            >
              <h1>{sem}</h1>
            </Col>
            <Col>
              <Row>
                {["A", "B", "C", "D"].map((sec) => {
                  return (
                    <Col md={4}>
                      <ClassCardComponent semester={sem} section={sec} />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
}
