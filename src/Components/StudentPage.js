import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import SubjectCardComponent from "./SubjectCardComponent";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
export default function StudentPage(props) {
  const { background_color, loginToken } = useContext(UserContext);
  const [studentData, setStudentData] = useState({});
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "auth-token":
          localStorage.getItem("jwtToken") === null
            ? props.loginToken
            : localStorage.getItem("jwtToken"),
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer" // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  async function getUserInfo() {
    postData("https://majorprojectzoom.herokuapp.com/user/attendee").then(
      (data) => {
        //console.log(data);
        //data = JSON.parse(data);
        //console.log(props.loginToken);
        setStudentData(data);
        //console.log(studentData); // JSON data parsed by `data.json()` call
      }
    );
  }
  useEffect(() => {
    getUserInfo();
  }, [props.loginToken]);
  return (
    <Container style={{ backgroundColor: background_color }}>
      {studentData.subjectList === undefined ? (
        <div style={{ left: "44%", position: "relative" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row>
            <h1>{studentData.section}</h1>
          </Row>
          <Row>
            {studentData.subjectList.map((subjectName) => {
              //console.log("this is the one ");
              //console.log(subjectName.isActive);
              return (
                <Col md={4}>
                  <SubjectCardComponent
                    classState={subjectName.isActive}
                    subject={subjectName.subjectName}
                    classroomID={
                      studentData.section + "_" + subjectName.subjectCode
                    }
                  />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Container>
  );
}
