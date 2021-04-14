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
  const [isTypeStudent, setStudentType] = useState(false);
  const [loginToken, setLoginToken] = useState(undefined);
  return (
    <div className="App" style={{ backgroundColor: "#9FC6FF" }}>
      <UserContext.Provider
        value={{
          isTypeStudent: isTypeStudent,
          background_color: "#9FC0FF",
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
                    />
                  </Col>
                </Row>
              </Container>
            </Route>
            <Route path="/">
              <NavbarComponent />
              {isTypeStudent ? (
                <StudentPage loginToken={loginToken} />
              ) : (
                <TeacherPage loginToken={loginToken} />
              )}
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}
