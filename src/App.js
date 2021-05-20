import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";
import { useState } from "react";
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
  useParams
} from "react-router-dom";
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
                    />
                  </Col>
                </Row>
              </Container>
            </Route>
            <Route path="/teacher">
              <NavbarComponent />
              <TeacherPage loginToken={loginToken} />
            </Route>
            <Route path="/student">
              <NavbarComponent />
              <StudentPage loginToken={loginToken} />
            </Route>

            <Route path="/">
              {console.log(isTypeStudent, loginToken)}
              {console.log(isTypeStudent === true)}
              {loginToken === null ? (
                <Container>
                  <Row>
                    <Col md={12}>
                      <LoginForm
                        loginToken={loginToken}
                        setLoginToken={setLoginToken}
                        setStudentType={setStudentType}
                      />
                    </Col>
                  </Row>
                </Container>
              ) : isTypeStudent === true ? (
                <>
                  <NavbarComponent />
                  <StudentPage loginToken={loginToken} />
                </>
              ) : (
                <>
                  <NavbarComponent />
                  <TeacherPage loginToken={loginToken} />
                </>
              )}
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}
