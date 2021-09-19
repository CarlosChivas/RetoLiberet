import React, { Component, Suspense } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Navigation.css";

class Navigation extends Component {
  render() {
    return (
      <div className="container-nav">
        <ul className="container-links">
          <li className="container-link">
            <Link className="link" to="/">
              <p>Home</p>
            </Link>
          </li>
          <li className="container-link">
            <Link className="link" to="/recharge">
              <p>Recargar creditos</p>
            </Link>
          </li>
          <li className="container-link">
            <Link className="link" to="/services">
              <p>Servicios</p>
            </Link>
          </li>
          <li className="container-link">
            <Link className="link" to="/history">
              <p>Historial</p>
            </Link>
          </li>
          <li className="container-link">
            <Link className="link" to="/create">
              <p>Crear un nuevo servicio</p>
            </Link>
          </li>
          <li className="container-link">
            <Link className="link" to="/campaign">
              <p>Crear una nueva campaña</p>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default function App(props) {
  return (
    <Suspense fallback="loading">
      <Navigation />
    </Suspense>
  );
}
