import React from "react";
import NavBar from "./components/nav/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import ComplaintsPage from "./pages/ComplaintsPage";
import UserManagementPage from "./pages/UserManagementPage";
import LoginPage from "./pages/LoginPage";
import AuthHelper from "./helpers/AuthHelper";
import { BASE_URL } from "./conf";
const getToken = () => {
  const token = AuthHelper.getToken();
  return token ? `JWT ${token}` : "";
};
const requestMiddleware = (operation) => {
  operation.setContext({
    headers: {
      Authorization: getToken(),
    },
  });
};
const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  request: requestMiddleware,
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/">
            <NavBar />
            <section className="page-content container">
              <div className="content">
                <Switch>
                  <Route path="/" exact>
                    <HomePage />
                  </Route>
                  <Route path="/complaints">
                    <ComplaintsPage />
                  </Route>
                  <Route path="/users">
                    <UserManagementPage />
                  </Route>
                </Switch>
              </div>
            </section>
          </Route>
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
