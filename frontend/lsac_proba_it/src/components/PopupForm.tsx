import { useState } from "react";
// import { FormLabel } from "react-bootstrap";

interface Props {
  name: "Register" | "Login";
  toggle: any;
}

function PopupForm({ name, toggle }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");

  function handleLogin(e: any) {
    console.log(name);
    e.preventDefault();
    // Code to handle login goes here
    toggle();
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>{name}</h2>
        <form onSubmit={handleLogin}>
          <label>
            <input
              placeholder="Email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            {name == "Register" ? (
              <label>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  value={repass}
                  onChange={(e) => setRepass(e.target.value)}
                ></input>
              </label>
            ) : null}
          </div>
          <button type="submit">
            {name == "Login" ? "Login" : "Create account"}
          </button>
        </form>
        <button onClick={toggle}>Close</button>
      </div>
    </div>
  );
}

export default PopupForm;
