import React, { Component, Suspense } from "react";
import axios from "axios";

class Recharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
    };
    this.recharge = this.recharge.bind(this);
  }
  recharge = async (e) => {
    e.preventDefault();
    const resPost = await axios({
      method: "PUT",
      data: {
        amount: this.state.amount,
      },
      withCredentials: true,
      url: "/recharge",
    });
    if (resPost.data === "User updated") {
      window.location.href = "/";
    }
  };

  render() {
    return (
      <div>
        <p>Bienvenido al sistema de recargas</p>
        <form onSubmit={this.recharge}>
          <input
            type="number"
            className={`password`}
            placeholder="Cantidad"
            name="password"
            onChange={(e) => this.setState({ amount: e.target.value })}
            required
          />
          <button type="submit" className="btn">
            <div className="btn__text">Recargar</div>
          </button>
        </form>
      </div>
    );
  }
}

export default function App(props) {
  return (
    <Suspense fallback="loading">
      <Recharge />
    </Suspense>
  );
}
