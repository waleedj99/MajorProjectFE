import { Col, Container, Row, Button, Tab, Tabs } from "react-bootstrap";
import ClassCardComponent from "./ClassCardComponent";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
export default function TeacherPage(props) {
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
      "https://cors-anywhere.herokuapp.com/https://majorprojectzoom.herokuapp.com/user/host"
    ).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <Container style={{ backgroundColor: background_color }}>
      <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
        <Tab eventKey="assigned" title="Your Classes">
          {" "}
        </Tab>
        <Tab eventKey="all" title="All Classes">
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
        </Tab>
      </Tabs>
    </Container>
  );
}
