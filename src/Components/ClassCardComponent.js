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

function ActiveClassButton(props) {
  const { selectedCourse, classState, setClassState, ToggleState } = props;
  return (
    <Button
      className="btn-rose-dark"
      onClick={() => {
        props.subjectList.map((item) => {
          if (item.subjectCode === selectedCourse) {
            item.isActive = !classState;
            setClassState(!classState);
          }
        });
        ToggleState(props.semsection, selectedCourse, !classState);
      }}
      variant="danger"
      block
    >
      End Class
    </Button>
  );
}

function IdleClassButton(props) {
  const { webRTC_URL } = useContext(UserContext);

  function sendUserInfo(role, userName, userId, classroomId) {
    let encodedString = window.btoa(
      role + "+" + userName + "+" + userId + "+" + classroomId
    );
    //postData(meetURL + "/" + encodedString).then((data) => {
    //console.log(studentData); // JSON data parsed by `data.json()` call
    //});
    console.log("encoded String is " + encodedString);

    window.location = webRTC_URL + encodedString;
  }

  const { selectedCourse, classState, setClassState, ToggleState } = props;
  return (
    <Button
      onClick={() => {
        // props.subjectList.map((item) => {
        //   if (item.subjectCode === selectedCourse) {
        //     item.isActive = !classState;
        //     setClassState(!classState);
        //   }
        // });
        ToggleState(props.semsection, selectedCourse, !classState);
        sendUserInfo(
          "Host",
          localStorage.getItem("dataPayloadDisplayname"),
          localStorage.getItem("dataPayloadUsername"),
          props.semsection + "_" + selectedCourse
        );
      }}
      variant="success"
      block
    >
      Start
    </Button>
  );
}

export default function ClassCardComponent(props) {
  const { card_color } = useContext(UserContext);
  const [selectedCourse, setSelectedCourse] = useState("Course");
  const [classState, setClassState] = useState("false");
  const [selectedCourseName, setSelectedCourseName] = useState("");
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
    localStorage.setItem("userSection", section);
    localStorage.setItem("userSubjectCode", subjectcode);
    postData("https://majorprojectzoom.herokuapp.com/user/host/toggle", {
      section: section,
      subjectcode: subjectcode,
      isactive: classState
    }).then((data) => {
      // JSON data parsed by `data.json()` call
    });
  }

  useEffect(() => {
    let subjectObj = props.subjectList[0];
    setSelectedCourse(subjectObj.subjectCode);
    setClassState(subjectObj.isActive);
    setSelectedCourseName(subjectObj.subjectName);
  }, []);
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
          <Card.Subtitle className="mb-2 ">{selectedCourseName}</Card.Subtitle>
          <Row>
            <Col>
              {classState ? (
                <ActiveClassButton
                  selectedCourse={selectedCourse}
                  classState={classState}
                  setClassState={setClassState}
                  subjectList={props.subjectList}
                  semsection={props.semsection}
                  ToggleState={ToggleState}
                />
              ) : (
                <IdleClassButton
                  selectedCourse={selectedCourse}
                  classState={classState}
                  setClassState={setClassState}
                  subjectList={props.subjectList}
                  semsection={props.semsection}
                  ToggleState={ToggleState}
                />
              )}
            </Col>
            <Col>
              <DropdownButton
                className="dropdn-btn"
                id="dropdown-basic-button"
                title={selectedCourse}
              >
                {props.subjectList === undefined ? (
                  <></>
                ) : (
                  props.subjectList.map((subjectObj) => {
                    return (
                      <Dropdown.Item
                        className="dropdn-btn"
                        onClick={() => {
                          setSelectedCourse(subjectObj.subjectCode);
                          setClassState(subjectObj.isActive);
                          setSelectedCourseName(subjectObj.subjectName);
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
