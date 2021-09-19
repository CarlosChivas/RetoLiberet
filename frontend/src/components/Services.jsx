import React, { Component, Suspense } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Action from "./Action";

import "./Services.css";

class Recharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      credits: true,
    };
  }
  async componentDidMount() {
    const res = await axios({
      method: "GET",
      url: "/getServices",
    });
    this.setState({ services: res.data });
    this.credits = this.credits.bind(this);
  }

  async contratar(_id) {
    const resPost = await axios({
      method: "PUT",
      data: {
        id: _id,
      },
      withCredentials: true,
      url: "/hire",
    });
    if (resPost.data === "Sin creditos") {
      //this.setState({ credits: false });
      console.log("Hola mundo");
    } else {
      window.location.href = "/history";
    }
  }

  credits = () => {
    this.setState({ credits: false });
  };

  render() {
    return (
      <div className="container-services">
        <h2 className="title-services">Servicios disponibles</h2>
        <ul className="container-list-services">
          {this.state.services.map((service) => {
            return (
              <Action
                key={service._id}
                action={service}
                credits={this.credits}
                className="action"
              />
            );
          })}
        </ul>
        {this.state.credits ? null : (
          <div>
            <p>
              No cuentas con creditos suficientes, te recomendamos hacer una
              recarga...
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
      <Recharge />
    </Suspense>
  );
}
