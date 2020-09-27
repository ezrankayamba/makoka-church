import React from "react";
import { NavLink } from "react-router-dom";
import UserProfile from "./UserProfile";
import useProfile from "../hooks/useProfile";

function NavBar() {
  const user = useProfile();
  console.log(user);
  return (
    <header className="navbar container">
      <div className="content">
        <h3>Twiga - CCMS</h3>
        <div className="nav-links">
          <ul>
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/complaints">Complaints</NavLink>
            </li>
            {user && user.me && user.me.isSuperuser && (
              <li>
                <NavLink to="/users">Users</NavLink>
              </li>
            )}
          </ul>
          <UserProfile />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
