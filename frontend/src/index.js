import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Header from "./comps/header/Header";
import UserContext from "./context/UserContext";
import Favourites from "./pages/favourites/Favourites";
import SingleImage from "./pages/singleImage/SingleImage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/images/:id" element={<SingleImage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
