import {
  Form,
  Col,
  Container,
  Row,
  Button,
  Tab,
  Tabs,
  Spinner
} from "react-bootstrap";
import ClassCardComponent from "./ClassCardComponent";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

import CustomLinkComponent from "./CustomLinkComponent";
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
    postData("https://majorprojectzoom.herokuapp.com/user/host").then(
      (data) => {
        // JSON data parsed by `data.json()` call

        let newData = [
          [undefined],
          [undefined],
          [undefined],
          [undefined],
          [undefined],
          [undefined],
          [undefined],
          [undefined]
        ];
        newData[0] = data.filter((semObj) => {
          return semObj.semNum == 1;
        });
        newData[1] = data.filter((semObj) => {
          return semObj.semNum == 2;
        });
        newData[2] = data.filter((semObj) => {
          return semObj.semNum == 3;
        });
        newData[3] = data.filter((semObj) => {
          return semObj.semNum == 4;
        });
        newData[4] = data.filter((semObj) => {
          return semObj.semNum == 5;
        });
        newData[5] = data.filter((semObj) => {
          return semObj.semNum == 6;
        });
        newData[6] = data.filter((semObj) => {
          return semObj.semNum == 7;
        });
        newData[7] = data.filter((semObj) => {
          return semObj.semNum == 8;
        });

        setTeacherData(newData);
      }
    );
  }
  useEffect(() => {
    //console.log("bruh");
    //  console.log(props.loginToken, localStorage.getItem("jwtToken"));

    getUserInfo();
  }, [props.loginToken]);
  return (
    <Container style={{ backgroundColor: background_color }}>
      <Row></Row>
      {teacherData === undefined ? (
        <div style={{ left: "44%", position: "relative" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {teacherData.map((semObject, ind) => {
            if (semObject.length > 0) {
              //console.log(semObject);

              return (
                <>
                  <Row id={"sem-" + ind + 1} style={{ width: "100%" }}>
                    <Col
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      md={1}
                    >
                      <h1>{ind + 1}</h1>
                    </Col>
                    <Col
                      style={{
                        boxShadow: "0em 0em 1em grey",
                        margin: "0.5em"
                      }}
                    >
                      {semObject.map((classObj) => {
                        return (
                          <Row>
                            <Col md={4}>
                              <ClassCardComponent
                                loginToken={props.loginToken}
                                subjectList={classObj.subjectList}
                                semsection={classObj.section}
                              />
                            </Col>
                          </Row>
                        );
                      })}
                    </Col>
                  </Row>
                </>
              );
            }
          })}
          <Row style={{ margin: "2em" }}>
            <h3>Create Your Link</h3>
          </Row>
          <Row style={{ marginBottom: "10em" }}>
            <CustomLinkComponent />
          </Row>
        </>
      )}
    </Container>
  );
}
