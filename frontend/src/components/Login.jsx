import React, { Component, Suspense } from "react";
//import { withTranslation } from "react-i18next";
import axios from "axios";

import CreateAccount from "./CreateAccount";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      username: "",
      password: "",
      badAccount: false,
    };

    this.hacerLogin = this.hacerLogin.bind(this);
  }

  hacerLogin = async (e) => {
    e.preventDefault();
    this.setState({ wrongAccountStyle: "" });
    const resPost = await axios({
      method: "POST",
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      withCredentials: true,
      url: "/login",
    });

    // si el username o contrasena esta mal corremos esto
    if (resPost.data === "No user found") {
      this.setState({ badAccount: true });
    } else {
      // esto se corre para poder entrar a la pagina
      window.location.href = "/";
    }
  };

  //funcion para cambiar el estado de show para saber si ensenar la pestana de crear cuenta o no y poder pasarla entre componentes la funcion
  showCreateAccount = () => {
    if (this.state.show) {
      this.setState({
        show: false,
      });
    } else {
      this.setState({
        show: true,
      });
    }
  };

  render() {
    return (
      <div className="container-login">
        <h1 className="title-login">Bienvenido al login</h1>
        <form onSubmit={this.hacerLogin}>
          <input
            type="text"
            className={`username`}
            placeholder="Username"
            name="username"
            onChange={(e) => this.setState({ username: e.target.value })}
            required
          />
          <input
            type="password"
            className={`password`}
            placeholder="Password"
            name="password"
            onChange={(e) => this.setState({ password: e.target.value })}
            required
          />
          <button type="submit" className="btn">
            <div className="btn__text">LOG IN</div>
          </button>
        </form>
        <button
          type="button"
          className="btn-new-account"
          onClick={() => {
            this.showCreateAccount();
          }}
        >
          Crear nueva cuenta
        </button>
        {
          /*Create Account*/
          this.state.show ? <CreateAccount /> : null
        }
      </div>
    );
  }
}

export default function App(props) {
  return (
    <Suspense fallback="loading">
      <Login />
    </Suspense>
  );
}
