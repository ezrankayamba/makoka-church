import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import MatIcon from "../../components/icons/MatIcon";
import { REGISTER_USER, USERS, USERS_GET_ME } from "../../helpers/UsersGraphQL";
import { useMutation } from "@apollo/react-hooks";
import Input from "../../components/forms/Input";

function NewUserPage() {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState(new Map());
  const [registerUser, { loading }] = useMutation(REGISTER_USER);

  function handleSubmit(e) {
    e.preventDefault();
    registerUser({
      variables: {
        ...formData,
      },
      refetchQueries: [{ query: USERS }, { query: USERS_GET_ME }],
    }).then(
      () => setRedirect("/users"),
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
    <div>
      <div className="toolbar">
        <div className="titlebar">
          <NavLink to="/users" className="btn btn-light mr-1">
            <MatIcon name="keyboard_arrow_left" />
          </NavLink>
          <h5>Register New User</h5>
        </div>
      </div>
      {loading && <p>Sending ....</p>}
      <form className="form form-medium" onSubmit={handleSubmit}>
        <div>
          <Input
            name="username"
            label="Username"
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            label="Email Address"
            onChange={handleChange}
            type="email"
            required
          />
          <Input
            name="firstName"
            label="First Name"
            onChange={handleChange}
            required
          />
          <Input
            name="lastName"
            label="Last Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-footer">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewUserPage;
