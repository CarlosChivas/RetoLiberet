import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
//import { withTranslation } from "react-i18next";
import axios from "axios";
import Navigation from "../components/Navigation";
import Home from "../components/Home";
import Recharge from "../components/Recharge";
import Services from "../components/Services";
import History from "../components/History";
import CreateService from "../components/CreateService";
import CreateCampaign from "../components/CreateCampaign";
import PageNotFound from "../components/PageNotFound";

function MyComponent(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Navigation />
        <Home />
      </Route>
      <Route path="/recharge">
        <Navigation />
        <Recharge />
      </Route>
      <Route path="/services">
        <Navigation />
        <Services />
      </Route>
      <Route path="/history">
        <Navigation />
        <History />
      </Route>
      <Route path="/create">
        <Navigation />
        <CreateService />
      </Route>
      <Route path="/campaign">
        <Navigation />
        <CreateCampaign />
      </Route>
      <Route path="/pageNotFound" component={PageNotFound} />
      <Redirect to="/pageNotFound" />
    </Switch>
  );
}

export default function App(props) {
  return (
    <Suspense fallback="Cargando...">
      <MyComponent user={props.user} />
    </Suspense>
  );
}
