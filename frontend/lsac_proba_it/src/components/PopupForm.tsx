import { useState } from "react";

interface Props {
  name: "Register" | "Login";
  toggle: any;
}

function PopupForm({ name, toggle }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            onClick={() => {
              console.log(name);
            }}
            type="submit"
          >
            {name == "Login" ? "Login" : "Create account"}
          </button>
        </form>
        <button onClick={toggle}>Close</button>
      </div>
    </div>
  );
}

export default PopupForm;
