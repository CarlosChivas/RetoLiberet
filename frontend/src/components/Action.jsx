import React, { Component, Suspense } from "react";
import axios from "axios";

import "./Action.css";

class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }

  async componentDidMount() {
    this.setState({ id: this.props.action._id });
  }

  async contratar() {
    const resPost = await axios({
      method: "PUT",
      data: {
        id: this.state.id,
      },
      withCredentials: true,
      url: "/hire",
    });
    if (resPost.data === "Sin creditos") {
      this.props.credits();
    } else {
      window.location.href = "/history";
    }
  }
  render() {
    return (
      <div className="container-action">
        <p>Nombre: {this.props.action.name}</p>
        <p>Costo: {this.props.action.cost}</p>
        <p>
          Contratar {this.props.action.name} con un costo de{" "}
          {this.props.action.cost}
        </p>
        <button
          type="button"
          className="btn btn-menu"
          onClick={async (event) => {
            this.contratar();
          }}
        >
          Contratar
        </button>
      </div>
    );
  }
}

export default function App(props) {
  return (
    <Suspense fallback="loading">
      <Action action={props.action} credits={props.credits} />
    </Suspense>
  );
}
