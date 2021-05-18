import { Form, Col, Container, Row, Button, Tab, Tabs } from "react-bootstrap";
import ClassCardComponent from "./ClassCardComponent";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
export default function TeacherPage(props) {
  const { background_color, loginToken } = useContext(UserContext);
  const [teacherData, setTeacherData] = useState(undefined);
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
    postData("https://majorprojectzoom.herokuapp.com/user/host").then(
      (data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        setTeacherData(data);
      }
    );
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <Container style={{ backgroundColor: background_color }}>
      <Row></Row>
      {teacherData === undefined ? (
        <div>
          <h1>LOADING</h1>
        </div>
      ) : (
        <>
          {teacherData.map((semObject) => {
            return (
              <>
                <Row id={"sem-" + semObject.semNum} style={{ width: "100%" }}>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    md={1}
                  >
                    <h1>{semObject.semNum}</h1>
                  </Col>
                  <Col
                    style={{
                      boxShadow: "0em 0em 1em grey",
                      margin: "0.5em"
                    }}
                  >
                    <Row>
                      {semObject.sectionList.map((sec) => {
                        return (
                          <Col md={4}>
                            <ClassCardComponent
                              subjectList={semObject.subjectList}
                              semsection={semObject.semNum + "-" + sec}
                            />
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                </Row>
              </>
            );
          })}
          <Row style={{ margin: "2em" }}>
            <h3>Create Your Link</h3>
          </Row>
          <Row style={{ marginBottom: "10em" }}>
            <Col>
              <Form.Label>Semester</Form.Label>
              <Form.Control as="select" custom>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Section </Form.Label>
              <Form.Control as="select" custom>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
              </Form.Control>
            </Col>

            <Col>
              <Form.Label>Course Code</Form.Label>
              <Form.Control type="text" placeholder="Code" />
            </Col>
            <Col>
              <Button style={{ marginTop: "2em" }} variant="primary" block>
                Get Link
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
