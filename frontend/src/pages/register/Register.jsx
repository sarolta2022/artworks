import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const register = (email, password) => {
  return fetch("http://localhost:8000/api/register", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return new Error("fetch wasn't successfull");
  });
};

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return new Error("Please, fill in both fields");
    }
    register(email, password).then(() => {
      navigate("/login");
    });
  };

  return (
    <section className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          className="register-input"
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="register-input"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="register-input"
          placeholder="repeat password"
          type="password"
          value={passwordRepeated}
          onChange={(e) => {
            setPasswordRepeated(e.target.value);
          }}
        />
        <button className="register-Btn">REGISTER</button>
      </form>
    </section>
  );
}

export default Register;
