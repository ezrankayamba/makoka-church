import React, { useState } from "react";
import Input from "../components/forms/Input";
import MatIcon from "../components/icons/MatIcon";
import AuthHelper from "../helpers/AuthHelper";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { USERS_GET_TOKEN } from "../helpers/UsersGraphQL";
import { APP_NAME } from "../conf";

function LoginPage(props) {
  const [formData, setFormData] = useState(new Map());
  const [redirect, setRedirect] = useState(null);
  const [login, { client }] = useMutation(USERS_GET_TOKEN);
  function handleSubmit(e) {
    e.preventDefault();
    client.clearStore();
    login({
      variables: {
        ...formData,
      },
    }).then(
      (res) => {
        if (res.data) {
          let { token } = res.data.tokenAuth;
          AuthHelper.saveToken(token, () => {
            setRedirect("/");
          });
        }
      },
      (res) => console.log("Error: ", res)
    );
  }
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  return redirect ? (
    <Redirect to={redirect} />
  ) : (
      <>
        <div className="login-page box-shadow">
          <div className="login-form">
            <div className="login-header d-flex mb-1 p-1">
              <h3>{APP_NAME}</h3>
              <img
                src={
                  process.env.PUBLIC_URL + "/static/images/logo.png"
                }
                alt="Logo"
              />
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="mt-1">
                <Input
                  name="username"
                  label="Username"
                  onChange={handleChange}
                  required
                />
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-footer">
                <button>
                  <span className="mr-1">Login</span>
                  <MatIcon name="login" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}

export default LoginPage;
