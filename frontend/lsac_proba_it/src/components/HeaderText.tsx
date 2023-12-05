// import React from "react";
import "./cmp_styles/headerText.css";

function HeaderText() {
  return (
    <>
      <div className="headerContainer">
        <div className="headerText">
          <p>
            Opiniile sunt mai importante ca niciodată. Platformele de sondaje
            permit organizatorilor să culeagă feedback direct de la audiența lor
            și să înțeleagă mai bine nevoile și dorințele acesteia.
          </p>
        </div>
        <div className="headerImage">
          <img
            id="turtle-img"
            alt="coolest makot ever"
            src="src\assets\testoasa 1.svg"
          />
        </div>
      </div>
    </>
  );
}

export default HeaderText;
