import { Card, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Form, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
export default function CustomLinkComponent(props) {
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const { webRTC_URL } = useContext(UserContext);

  function sendUserInfo(role, userName, userId, classroomId) {
    let encodedString = window.btoa(
      role + "+" + userName + "+" + userId + "+" + classroomId
    );
    console.log(role, userName, userId, classroomId);
    window.location = webRTC_URL + encodedString;
    console.log("encoded String is " + encodedString);
  }

  return (
    <>
      <Col>
        <Form.Label>Semester</Form.Label>
        <Form.Control
          onChange={(e) => {
            setSelectedSem(e.target.value);
          }}
          as="select"
          custom
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
            return <option value={semNum}>{semNum}</option>;
          })}
        </Form.Control>
      </Col>
      <Col>
        <Form.Label>Section </Form.Label>
        <Form.Control
          onChange={(e) => {
            setSelectedSection(e.target.value);
          }}
          as="select"
          custom
        >
          {["A", "B", "C", "D", "E"].map((sectionName) => {
            return <option value={sectionName}>{sectionName}</option>;
          })}
        </Form.Control>
      </Col>

      <Col>
        <Form.Label>Course Code</Form.Label>
        <Form.Control
          onChange={(e) => setSelectedCourseCode(e.target.value)}
          type="text"
          placeholder="Code"
        />
      </Col>
      <Col>
        <Button
          className="btn-rose-dark"
          onClick={() => {
            sendUserInfo(
              "Host",
              localStorage.getItem("dataPayloadDisplayname"),
              localStorage.getItem("dataPayloadUsername"),
              selectedSem + selectedSection + "_" + selectedCourseCode
            );
          }}
          style={{ marginTop: "2em" }}
          variant="primary"
          block
        >
          Start Class
        </Button>
      </Col>
    </>
  );
}
