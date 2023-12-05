// import React from "react";
import "./App.css";
import NavbarMain from "./components/NavbarMain";
import FooterMain from "./components/FooterMain";
import HeaderText from "./components/HeaderText";
import Poll from "./components/Poll";

// TODO: center the buttons
// TODO: make the svg transparent
// TODO: add poll component
// TODO: make components for the poll work with the backend
// TODO: make the poll component look good
// TODO: Style the popup login
// TODO: make the login work with the backend

function App() {
  return (
    <>
      <NavbarMain />
      {/* <div className="BIG"></div> //div used for testing footer and navbar positioning */}
      <div className="pageContainer">
        <HeaderText />
        <Poll />
      </div>
      <FooterMain />
    </>
  );
}

export default App;
