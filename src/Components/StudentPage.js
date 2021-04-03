import { Col, Container, Row, Button } from "react-bootstrap";
import SubjectCardComponent from "./SubjectCardComponent";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
export default function StudentPage(props) {
  const { background_color, loginToken } = useContext(UserContext);

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "auth-token": props.loginToken,
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer" // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  async function getUserInfo() {
    postData(
      "https://cors-anywhere.herokuapp.com/https://majorprojectzoom.herokuapp.com/user/attendee"
    ).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  }
  useEffect(() => {
    getUserInfo();
  }, []);
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
