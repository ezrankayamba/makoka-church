import React, { useState } from "react";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import MatIcon from "../../components/icons/MatIcon";
import {
  REGISTER_USER,
  USERS,
  USERS_GET_ME,
  GET_USER,
} from "../../helpers/UsersGraphQL";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Input from "../../components/forms/Input";

function UpdateUserPage({ match }) {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState(new Map());
  const [registerUser, {}] = useMutation(REGISTER_USER);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: match.params.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let user = data.user;

  function handleSubmit(e) {
    e.preventDefault();
    let prev = new Map();
    Object.keys(user).forEach((key) => {
      if (!formData[key]) {
        prev[key] = user[key];
      }
    });

    registerUser({
      variables: { ...formData, ...prev, id: user.id },
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
          <h5>Update User</h5>
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
            defaultValue={user.username}
            readOnly={true}
          />
          <Input
            name="email"
            label="Email Address"
            onChange={handleChange}
            type="email"
            required
            defaultValue={user.email}
          />
          <Input
            name="firstName"
            label="First Name"
            onChange={handleChange}
            required
            defaultValue={user.firstName}
          />
          <Input
            name="lastName"
            label="Last Name"
            onChange={handleChange}
            required
            defaultValue={user.lastName}
          />
        </div>
        <div className="form-footer">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(UpdateUserPage);
