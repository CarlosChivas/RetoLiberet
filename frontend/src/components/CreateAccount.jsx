import React, { Component, Suspense } from "react";
import axios from "axios";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      lastName: "",
      email: "",
      gender: "",
      password: "",
    };

    this.crearCuenta = this.crearCuenta.bind(this);
  }

  crearCuenta = async (e) => {
    e.preventDefault();

    const resPost = await axios({
      method: "POST",
      data: {
        username: this.state.username,
        name: this.state.name,
        lastName: this.state.lastName,
        email: this.state.email,
        gender: this.state.gender,
        password: this.state.password,
      },
      withCredentials: true,
      url: "/register",
    });

    console.log(resPost.data);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.crearCuenta}>
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
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default function App(props) {
  return (
    <Suspense fallback="loading">
      <CreateAccount />
    </Suspense>
  );
}
