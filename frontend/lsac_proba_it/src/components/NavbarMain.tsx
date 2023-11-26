// import React from "react";
// Navbar components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";

// My imports
import "./cmp_styles/navbar.css";
import "./cmp_styles/login.css";
import PopupButton from "./PopupButton";
import PopupForm from "./PopupForm";

// TODO: style popupForm

function NavbarMain() {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  function togglePop(name: string) {
    if (name == "Login") setLogin(!login);
    if (name == "Register") setRegister(!register);

    // depending on the type of button display different form
    console.log({ name });
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              className="logo"
              src="src\assets\logo.svg"
              alt="This is the prettiest logo you have ever seen"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbar-buttons">
            <Nav className="ml-auto">
              {/* Used them as Nav.Link to skip styling the hamburger buttons */}
              <Nav.Link id="pop-btn">
                <PopupButton name="Register" onClick={togglePop}></PopupButton>
                <div>
                  {register ? (
                    <PopupForm name="Register" toggle={togglePop} />
                  ) : null}
                </div>
              </Nav.Link>
              <Nav.Link id="pop-btn">
                <PopupButton name="Login" onClick={togglePop}></PopupButton>
                <div>
                  {login ? <PopupForm name="Login" toggle={togglePop} /> : null}
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMain;
