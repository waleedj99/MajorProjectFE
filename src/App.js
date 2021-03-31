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
  const [loginToken, setLoginToken] = useState("");
  return (
    <div className="App" style={{ backgroundColor: "#9FC0FF" }}>
      <UserContext.Provider
        value={{
          isTypeStudent: isTypeStudent,
          background_color: "#9FC0FF",
          card_color: "#126072"
        }}
      >
        <Col md={5}>
          <LoginForm setLoginToken={setLoginToken} />
        </Col>
        <NavbarComponent />
        {isTypeStudent ? <StudentPage /> : <TeacherPage />}
      </UserContext.Provider>
    </div>
  );
}
