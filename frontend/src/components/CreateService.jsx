import React, { Component, Suspense } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class CreateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cost: "",
      credits: true,
    };

    this.createService = this.createService.bind(this);
  }

  createService = async (e) => {
    e.preventDefault();
    const resPost = await axios({
      method: "POST",
      data: {
        name: this.state.name,
        cost: this.state.cost,
      },
      withCredentials: true,
      url: "/createService",
    });
    if (resPost.data === "Servicio creado") {
      window.location.href = "/services";
    } else {
      this.setState({ credits: false });
    }
    console.log(resPost.data);
  };

  render() {
    return (
      <div>
        <p>Crear un servicio</p>
        <form onSubmit={this.createService}>
          <input
            type="text"
            className={`username`}
            placeholder="Nombre del servicio"
            name="name"
            onChange={(e) => this.setState({ name: e.target.value })}
            required
          />
          <input
            type="number"
            className={`password`}
            placeholder="Costo del servicio"
            name="cost"
            onChange={(e) => this.setState({ cost: e.target.value })}
            required
          />
          <button type="submit">Crear</button>
        </form>
        {this.state.credits ? null : (
          <div>
            <p>
              Lo sentimos, no tienes suficientes creditos para esta acción, te
              invitamos a hacer una recarga a continuación
            </p>
            <Link to="/recharge">
              <p>Recargar creditos</p>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default function App(props) {
  return (
    <Suspense fallback="loading">
      <CreateService activated={props.activated} />
    </Suspense>
  );
}
