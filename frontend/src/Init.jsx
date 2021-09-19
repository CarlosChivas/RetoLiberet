import axios from "axios";
import React, { Component, Suspense } from "react";

//import LoadingCircle from "./component/reusable-components/LoadingScreen";

// axios.defaults.baseURL = "https://feedtec.herokuapp.com";
// axios.defaults.baseURL = "http://143.198.55.191:4000";
axios.defaults.baseURL = "http://localhost:2000";
axios.defaults.withCredentials = true;

export default class Init extends Component {
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

  render() {
    var App;
    /*if (this.state.loading) {
      return <LoadingCircle />;
    }*/
    if (this.state.user) {
      /*if (this.state.user.role === "Admin") {
        App = React.lazy(() => import("./app/App"));
      } else if (this.state.user.role === "User") {
        App = React.lazy(() => import("./app/AppUser"));
      } else if (this.state.user.role === "Manager") {
        App = React.lazy(() => import("./app/AppGod"));
      }*/
      App = React.lazy(() => import("./app/App"));
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <App user={this.state.user} />
        </Suspense>
      );
    }
    App = React.lazy(() => import("./app/Login"));
    return (
      <Suspense>
        <App />
      </Suspense>
    );
  }
}
