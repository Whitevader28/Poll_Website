// import React from "react";
import "./App.css";
import NavbarMain from "./components/NavbarMain";
import FooterMain from "./components/FooterMain";
import Container from "react-bootstrap/esm/Container";

function App() {
  return (
    <>
      <NavbarMain />
      <div className="content-of-page">
        <FooterMain />
      </div>
    </>
  );
}

export default App;
