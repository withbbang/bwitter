import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">
          {userObj.displayName
            ? `Profile of ${userObj.displayName}`
            : "Profile of User"}
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
