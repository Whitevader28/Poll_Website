// import React from "react";
import Nav from "react-bootstrap/Nav";
import PopupButton from "./PopupButton";
import "./cmp_styles/navbar.css";

function Navbar() {
  const handleClick = (name: string) => {
    console.log({ name });
  };

  // Chamge from Nav to Navbar, it has the hamburger menu collapse already integrated

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
      <Nav.Item className="btn">
        <PopupButton name={"Register"} onClick={handleClick}></PopupButton>
      </Nav.Item>
      <Nav.Item className="btn">
        <PopupButton name={"Login"} onClick={handleClick}></PopupButton>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
