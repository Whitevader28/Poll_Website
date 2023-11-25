// import React from "react";
import "./cmp_styles/footer.css";

function FooterMain() {
  return (
    <>
      <footer id="my-footer">
        <a className="link-btn" href="https://www.instagram.com/lsacbucuresti/">
          <img src="src\assets\mdi_instagram.svg" alt="Follow on insta" />
        </a>
        <a className="link-btn" href="https://www.facebook.com/LsacBucuresti">
          <img src="src\assets\uil_facebook.svg" alt="Follow on insta" />
        </a>
        <a className="link-btn" href="https://www.twitch.tv/lsac_bucuresti">
          <img src="src\assets\mdi_twitch.svg" alt="Follow on insta" />
        </a>
      </footer>
    </>
  );
}

export default FooterMain;
