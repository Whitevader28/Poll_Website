// import React from "react";
import "./App.css";
import NavbarMain from "./components/NavbarMain";
import FooterMain from "./components/FooterMain";
import HeaderText from "./components/HeaderText";

// TODO: Center a div (in header text and footer main)

function App() {
  return (
    <>
      <NavbarMain />
      {/* <div className="BIG"></div> //div used for testing footer and navbar positioning */}
      <div className="pageContainer">
        <HeaderText />
      </div>
      <FooterMain />
    </>
  );
}

export default App;
