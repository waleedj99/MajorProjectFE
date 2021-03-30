import { Navbar, Container, Nav } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
export default function NavbarComponent() {
  const { isTypeStudent } = useContext(UserContext);
  return (
    <Navbar sticky="top" expand="lg" variant="dark" bg="dark">
      <Navbar.Brand href="#">Navbar</Navbar.Brand>
      {isTypeStudent ? <> </> : <TeacherNavbar />}
    </Navbar>
  );
}

function TeacherNavbar() {
  return (
    <>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#sem-1">SEM 1</Nav.Link>
          <Nav.Link href="#sem-2">SEM 2</Nav.Link>
          <Nav.Link href="#sem-3">SEM 3</Nav.Link>
          <Nav.Link href="#sem-4">SEM 4</Nav.Link>
          <Nav.Link href="#sem-5">SEM 5</Nav.Link>
          <Nav.Link href="#sem-6">SEM 6</Nav.Link>
          <Nav.Link href="#sem-7">SEM 7</Nav.Link>
          <Nav.Link href="#sem-8">SEM 8</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>
  );
}
