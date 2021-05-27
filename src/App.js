import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { UserContext } from "./Context/UserContext";
import StudentPage from "./Components/StudentPage";
import TeacherPage from "./Components/TeacherPage";
import NavbarComponent from "./Components/NavbarComponent";
import LoginForm from "./Components/LoginForm";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

function RedirectCheck(props) {
  console.log("userType", props.userType);
  console.log("login Token", props.loginToken, typeof props.loginToken);

  if (props.userType !== null && props.loginToken !== null) {
    if (props.userType === "true" || props.userType === true) {
      return <Redirect to="/student" />;
    } else if (props.userType === "false" || props.userType === false) {
      return <Redirect to="/teacher" />;
    } else {
      return <>Loading</>;
    }
  } else {
    return <Redirect to="/login" />;
  }
}

export default function App() {
  const [isTypeStudent, setStudentType] = useState(
    localStorage.getItem("userType")
  );
  const [loginToken, setLoginToken] = useState(
    localStorage.getItem("jwtToken")
  );

  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      <UserContext.Provider
        value={{
          isTypeStudent: isTypeStudent,
          loginToken: loginToken,
          setLoginToken: setLoginToken,
          background_color: "white",
          card_color: "#126072"
        }}
      >
        <Router>
          <Switch>
            <Route path="/login">
              <Container>
                <Row>
                  <Col md={12}>
                    <LoginForm
                      loginToken={loginToken}
                      setLoginToken={setLoginToken}
                      setStudentType={setStudentType}
                      userType={isTypeStudent}
                    />
                  </Col>
                </Row>
              </Container>
            </Route>
            <Route path="/student">
              <NavbarComponent />
              <StudentPage loginToken={loginToken} />
            </Route>
            <Route path="/teacher">
              <NavbarComponent />
              <TeacherPage loginToken={loginToken} />
            </Route>

            <Route path="/">
              {/* {console.log(localStorage.getItem("userType"), loginToken)}
              {console.log(isTypeStudent, loginToken)} */}

              <RedirectCheck userType={isTypeStudent} loginToken={loginToken} />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}
