import { useState } from "react";

interface Props {
  name: "Login" | "Register";
  toggle: any;
}

function PopupForm({ name, toggle }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: any) {
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
          <button type="submit">{name}</button>
        </form>
        <button onClick={toggle}>Close</button>
      </div>
    </div>
  );
}

export default PopupForm;
