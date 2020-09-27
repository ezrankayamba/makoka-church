import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";

function PageView() {
  return (
    <section className="page-content container">
      <div className="content">
        <Router>
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </section>
  );
}

export default PageView;
