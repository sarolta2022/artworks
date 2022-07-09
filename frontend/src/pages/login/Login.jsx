import { useState, useContext, useEffect } from "react";
import { userContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

const login = (email, password) => {
  return fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return new Error("fetch wasn't successfull");
    })
    .then((json) => {
      return json;
    });
};

function Login() {
  const navigate = useNavigate();
  const { setUser, user } = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      return new Error("Please, fill in both fields");
    }
    login(email, password)
      .then((data) => {
        setUser(data);
        console.log("user after login:", user);
      })
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    console.log("user in useEffect:", user);
  }, [user]);

  return (
    <section className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        <input
          placeholder="email"
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="password"
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="login-Btn">LOGIN</button>
      </form>
    </section>
  );
}

export default Login;
