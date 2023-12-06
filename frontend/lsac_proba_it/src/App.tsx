// import React from "react";
import "./App.css";
import NavbarMain from "./components/NavbarMain";
import FooterMain from "./components/FooterMain";
import HeaderText from "./components/HeaderText";
import Poll from "./components/Poll";

// TODO: style the popup login
// TODO: add show password button
// TODO: enjoy the rest of your day

function App() {
  return (
    <>
      <NavbarMain />
      <div className="pageContainer">
        <HeaderText />
        <Poll />
      </div>
      <FooterMain />
    </>
  );
}

export default App;
