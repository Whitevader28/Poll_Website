// import React from "react";
import "./cmp_styles/footer.css";

function FooterMain() {
  return (
    <>
      <footer id="my-footer">
        <div className="link-btn-container">
          <a href="https://www.instagram.com/lsacbucuresti/">
            <img
              className="link-btn"
              src="src\assets\mdi_instagram.svg"
              alt="Follow on insta"
            />
          </a>
          <a href="https://www.facebook.com/LsacBucuresti">
            <img
              className="link-btn"
              src="src\assets\uil_facebook.svg"
              alt="Follow on insta"
            />
          </a>
          <a href="https://www.twitch.tv/lsac_bucuresti">
            <img
              className="link-btn"
              src="src\assets\mdi_twitch.svg"
              alt="Follow on insta"
            />
          </a>
        </div>
      </footer>
    </>
  );
}

export default FooterMain;
