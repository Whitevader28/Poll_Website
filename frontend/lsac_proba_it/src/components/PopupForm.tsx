import { useState } from "react";
import axios from "axios";

interface Props {
  name: "Register" | "Login" | "Create Poll" | "Logout";
  toggle: any;
}

function PopupForm({ name, toggle }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    if (name == "Login") {
      axios
        .post("http://localhost:5000/login", {
          email: username,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_id", response.data.user_id);
          alert(response.data.message);
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data);
          console.log(error);
        });
    } else if (name == "Register") {
      axios
        .post("http://localhost:5000/register", {
          username: username,
          password: password,
          repass: repass,
        })
        .then((response) => {
          alert(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data);
        });
    } else if (name == "Create Poll") {
      axios
        .post(
          "http://localhost:5000/create_poll",
          {
            username: localStorage.getItem("username"),
            question: username,
            answer1: password,
            answer2: repass,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          alert(response.data);
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (name == "Logout") {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        alert("You are out!");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }

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
          <button type="submit" onClick={handleLogin}>
            {name == "Login" ? "Login" : "Create account"}
          </button>
        </form>
        <button onClick={toggle}>Close</button>
      </div>
    </div>
  );
}

export default PopupForm;
