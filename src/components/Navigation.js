import React from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faBreadSlice);

const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
        <Link
          to="/"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faBreadSlice} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>Home</span>
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            marginLeft: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {userObj && userObj.displayName ? userObj.displayName : "User"}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
