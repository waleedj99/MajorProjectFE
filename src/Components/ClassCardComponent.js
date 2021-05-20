import {
  Card,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
export default function ClassCardComponent(props) {
  const { card_color } = useContext(UserContext);
  const [selectedCourse, setSelectedCourse] = useState("Course");
  const [classState, setClassState] = useState("false");
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "auth-token": props.loginToken,
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  async function ToggleState(section, subjectcode, classState) {
    postData("https://majorprojectzoom.herokuapp.com/user/host/toggle", {
      section: section,
      subjectcode: subjectcode,
      isactive: classState
    }).then((data) => {
      console.log(data);
      console.log(props.subjectList);
      // JSON data parsed by `data.json()` call
    });
  }

  useEffect(() => {});
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
              <Button
                onClick={() => {
                  props.subjectList.map((item) => {
                    if (item.subjectCode === selectedCourse) {
                      item.isActive = !classState;
                      setClassState(!classState);
                    }
                  });
                  ToggleState(props.semsection, selectedCourse, !classState);
                }}
                variant={classState ? "light" : "dark"}
                block
              >
                Start
              </Button>
            </Col>
            <Col>
              <DropdownButton id="dropdown-basic-button" title={selectedCourse}>
                {props.subjectList === undefined ? (
                  <></>
                ) : (
                  props.subjectList.map((subjectObj) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedCourse(subjectObj.subjectCode);
                          setClassState(subjectObj.isActive);
                        }}
                      >
                        {subjectObj.subjectCode}
                      </Dropdown.Item>
                    );
                  })
                )}
              </DropdownButton>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
