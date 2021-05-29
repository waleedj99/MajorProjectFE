import { Navbar, Container, Nav } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
export default function NavbarComponent() {
  const { isTypeStudent } = useContext(UserContext);
  return (
    <Navbar sticky="top" expand="lg">
      <Navbar.Brand href="#">EdHub</Navbar.Brand>
      <TeacherNavbar />
    </Navbar>
  );
}

function clearLocalStorage() {
  localStorage.setItem("jwtToken", null);
  localStorage.setItem("userType", null);
  localStorage.setItem("dataPayloadDisplayname", null);
  localStorage.setItem("dataPayloadUsername", null);
}
function TeacherNavbar() {
  return (
    <>
      <Nav className="ml-auto">
        <Nav.Link href="/login" onClick={clearLocalStorage}>
          Log Out
        </Nav.Link>
      </Nav>
    </>
  );
}
