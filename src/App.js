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
  if (props.userType === true && props.isDataLoaded) {
    return <Redirect to="/student" />;
  } else if (props.userType === false && props.isDataLoaded) {
    return <Redirect to="/teacher" />;
  } else {
    return <div></div>;
  }
}

export default function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    //Add a vairabel to indicate that the data is loaded
    console.log("this is login token", loginToken);

    if (loginToken !== null && isTypeStudent !== null) {
      console.log("bueh hee i am ");
      setIsDataLoaded(true);
    }
  }, [loginToken, isTypeStudent]);

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
              {console.log("is Type student:", isTypeStudent)}
              <RedirectCheck
                isDataLoaded={isDataLoaded}
                userType={isTypeStudent}
                loginToken={loginToken}
              />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}
