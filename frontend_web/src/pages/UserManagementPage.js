import React from "react";
import { USERS } from "../helpers/UsersGraphQL";
import NewUserPage from "./users/NewUserPage";
import { useQuery } from "@apollo/react-hooks";
import { Route, NavLink, useHistory } from "react-router-dom";
import MatIcon from "../components/icons/MatIcon";
import Table from "../components/tables/Table";
import useProfile from "../components/hooks/useProfile";
import UpdateUserPage from "./users/UpdateUserPage";

function UserManagementPage(props) {
  useProfile();
  const { loading, error, data } = useQuery(USERS);
  if (loading) return null;
  if (error) {
    return <p>Error (:</p>;
  }
  const columns = [
    { name: "id", label: "ID" },
    { name: "username", label: "Client Name" },
    { name: "email", label: "Email" },
    { name: "name", label: "Full Name" },
    {
      name: "actions",
      label: "",
      render: (row) => (
        <div>
          <a href={`/users/update/${row.id}`} className="d-flex align-left">
            <MatIcon name="edit" text="Edit" />
          </a>
        </div>
      ),
    },
  ];

  const records = data.users.map((r) => ({
    ...r,
    name: r.firstName ? `${r.firstName} ${r.lastName}` : null,
  }));
  return (
    <>
      <Route path="/users" exact>
        <div className="toolbar">
          <h5>List of users</h5>
          <NavLink
            className="d-flex btn btn-light has-left-icon"
            to="/users/new-user"
          >
            <MatIcon name="add" text="New User" />
          </NavLink>
        </div>
        <Table columns={columns} data={records} />
      </Route>
      <Route path="/users/new-user" exact>
        <NewUserPage />
      </Route>
      <Route path="/users/update/:id" exact>
        <UpdateUserPage />
      </Route>
    </>
  );
}

export default UserManagementPage;
