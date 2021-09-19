import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { React, Suspense } from "react";

import Login from "../components/Login";
import PageNotFound from "../components/PageNotFound";

function MyComponent(props) {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/pageNotFound">
          <PageNotFound />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default function App(props) {
  return (
    <Suspense fallback="Cargando...">
      <MyComponent />
    </Suspense>
  );
}
