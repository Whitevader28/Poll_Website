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
  const [createPoll, setCreatePoll] = useState(false);
  const [logout, setLogout] = useState(false);

  function isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  console.log("login?");
  console.log(isLoggedIn());

  function togglePop(name?: string) {
    if (name == "Login") setLogin(!login);
    if (name == "Register") setRegister(!register);
    if (name == "Create Poll") setCreatePoll(!createPoll);
    if (name == "Logout") setLogout(!logout);

    // depending on the type of button display different form
    console.log({ name });
  }

  function closePop() {
    setLogin(false);
    setRegister(false);
    setCreatePoll(false);
    setLogout(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.reload();
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" id="sticky">
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
              {isLoggedIn() ? (
                <>
                  <Nav.Link id="pop-btn">
                    <PopupButton
                      name="Create Poll"
                      onClick={togglePop}
                    ></PopupButton>
                    <div>
                      {createPoll ? (
                        <PopupForm name="Create Poll" toggle={closePop} />
                      ) : null}
                    </div>
                  </Nav.Link>
                  <Nav.Link id="pop-btn">
                    <PopupButton
                      name="Logout"
                      onClick={handleLogout}
                    ></PopupButton>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link id="pop-btn">
                    <PopupButton
                      name="Register"
                      onClick={togglePop}
                    ></PopupButton>
                    <div>
                      {register ? (
                        <PopupForm name="Register" toggle={closePop} />
                      ) : null}
                    </div>
                  </Nav.Link>
                  <Nav.Link id="pop-btn">
                    <PopupButton name="Login" onClick={togglePop}></PopupButton>
                    <div>
                      {login ? (
                        <PopupForm name="Login" toggle={closePop} />
                      ) : null}
                    </div>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMain;
