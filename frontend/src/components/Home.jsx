import React, { Component, Suspense } from "react";
import axios from "axios";

import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
    };
  }
  async componentDidMount() {
    const resUser = await axios({
      method: "GET",
      url: "/user",
    });

    this.setState({ user: resUser.data });
    this.setState({ loading: false });
  }
  async logOut() {
    const res = await axios({
      method: "GET",
      withCredentials: true,
      url: "/logOut",
    });
    console.log(res);
    window.location.reload();
  }

  render() {
    return (
      <div className="container-home">
        <h2 className="title-welcome">
          Un gusto tenerte de nuevo{" "}
          {this.state.loading ? null : this.state.user.name}
        </h2>
        <h3 className="text-credits">
          Créditos disponibles:{" "}
          {this.state.loading ? null : this.state.user.credits}
        </h3>

        <button type="button" className="btn-logout" onClick={this.logOut}>
          Log Out
        </button>
      </div>
    );
  }
}

export default function App(props) {
  return (
    <Suspense fallback="loading">
      <Home />
    </Suspense>
  );
}
