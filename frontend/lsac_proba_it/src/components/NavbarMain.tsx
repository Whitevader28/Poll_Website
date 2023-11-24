// import React from "react";
// Navbar components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// My imports
import "./cmp_styles/navbar.css";
import PopupButton from "./PopupButton";

function NavbarMain() {
  const handleClick = (name: string) => {
    console.log({ name });
  };

  // Chamge from Nav to Navbar, it has the hamburger menu collapse already integrated

  // return (
  //   <Nav
  //     className="navbar"
  //     activeKey="/home"
  //     onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
  //   >
  //     <Nav.Item className="logo">
  //       <Nav.Link href="#">
  // <img
  //   src="src\assets\logo.svg"
  //   alt="This is the prettiest logo you have ever seen"
  // />
  //       </Nav.Link>
  //     </Nav.Item>
  //     <Nav.Item className="btn">
  // <PopupButton name={"Register"} onClick={handleClick}></PopupButton>
  //     </Nav.Item>
  //     <Nav.Item className="btn">
  // <PopupButton name={"Login"} onClick={handleClick}></PopupButton>
  //     </Nav.Item>
  //   </Nav>
  // );
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="src\assets\logo.svg"
            alt="This is the prettiest logo you have ever seen"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <PopupButton
                name={"Register"}
                onClick={handleClick}
              ></PopupButton>
            </Nav.Link>
            <Nav.Link>
              <PopupButton name={"Login"} onClick={handleClick}></PopupButton>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;
