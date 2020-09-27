import React from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { USERS_GET_ME } from "../../helpers/UsersGraphQL";

function UserProfile(props) {
  let { loading, error, data } = useQuery(USERS_GET_ME);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <div className="user-profile-nav">
      <ul>
        <li>
          <b>{data.me.username}</b>
        </li>
        <li>
          <NavLink exact to="/login">
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UserProfile;
