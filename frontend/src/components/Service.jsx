import React, { Component, Suspense } from "react";
import "./Service.css";

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  async componentDidMount() {
    const dateAndTime = new Date(this.props.action.createdAt);
    this.setState({
      date: `${dateAndTime.getDate()} / ${
        dateAndTime.getMonth() + 1
      } / ${dateAndTime.getFullYear()} a las ${dateAndTime.getHours()}:${dateAndTime.getMinutes()}`,
    });
  }

  render() {
    return (
      <div className="container-service-history">
        <p> Nombre: {this.props.action.name}</p>
        <p> Costo: {this.props.action.cost} </p>
        <p> Fecha: {this.state.date}</p>
      </div>
    );
  }
}

export default function App(props) {
  return (
    <Suspense fallback="loading">
      <Service action={props.action} />
    </Suspense>
  );
}
