import React, { Component, Suspense } from "react";
import axios from "axios";
import Service from "./Service";
import "./History.css";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  async componentDidMount() {
    const res = await axios({
      method: "GET",
      url: "/getHistory",
    });
    this.setState({ history: res.data });
  }

  render() {
    return (
      <div className="container-history">
        <h2 className="title-history">Bienvenido al historial de servicios</h2>
        {this.state.history.map((action) => {
          return (
            <div key={action._id}>
              <Service action={action} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default function App(props) {
  return (
    <Suspense fallback="loading">
      <History login={props.login} />
    </Suspense>
  );
}
