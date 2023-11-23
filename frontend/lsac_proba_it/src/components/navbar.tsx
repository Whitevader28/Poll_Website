// import React from "react";
import Nav from "react-bootstrap/Nav";
import PopupButton from "./PopupButton";
import "./cmp_styles/navbar.css";

function Navbar() {
  const handleClick = (name: string) => {
    console.log({ name });
  };

  return (
    <Nav
      className="navbar"
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item className="logo">
        <Nav.Link href="#">
          <img
            src="src\assets\logo.svg"
            alt="This is the prettiest logo you have ever seen"
          />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <PopupButton
          name={"Register"}
          onClick={() => {
            handleClick(/*aici*/);
          }}
        ></PopupButton>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
