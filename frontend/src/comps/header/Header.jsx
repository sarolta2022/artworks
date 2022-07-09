import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { userContext } from "../../context/UserContext";
function Header() {
  const { user } = useContext(userContext);

  return (
    <header className="Header">
      <nav>
        <Link to="/">Gallery</Link>
        <Link to="/favourites">Favourites</Link>
        {user ? <Link to="#">Welcome</Link> : <Link to="/login">Login</Link>}
        {user ? null : <Link to="/register">Register</Link>}
      </nav>
    </header>
  );
}

export default Header;
