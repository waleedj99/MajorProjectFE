import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { UserContext } from "./Context/UserContext";
import StudentPage from "./Components/StudentPage";
import TeacherPage from "./Components/TeacherPage";
import NavbarComponent from "./Components/NavbarComponent";
import LoginForm from "./Components/LoginForm";
export default function App() {
  const [isTypeStudent, setStudentType] = useState(false);
  const [loginToken, setLoginToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjFkczE3Y3M4MDAiLCJ1c2VyVHlwZSI6ImF0dGVuZGVlIiwiaWF0IjoxNjE3MTgyMjcxfQ.jPyyqwmPs9UadO7k7fhquYZQrgwlveGnDDnCJZv7kqE"
  );
  return (
    <div className="App" style={{ backgroundColor: "#9FC6FF" }}>
      <UserContext.Provider
        value={{
          isTypeStudent: isTypeStudent,
          background_color: "#9FC0FF",
          card_color: "#126072",
          loginToken: loginToken
        }}
      >
        <Col md={5}>
          <LoginForm setLoginToken={setLoginToken} />
        </Col>
        <NavbarComponent />
        {isTypeStudent ? (
          <StudentPage loginToken={loginToken} />
        ) : (
          <TeacherPage loginToken={loginToken} />
        )}
      </UserContext.Provider>
    </div>
  );
}
