import React from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";

const NavLinks = (props) => {
  return (
    <>
      <ul className="nav-links">
        <li>
          <NavLink to="/">
            ALL USERS
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${props.userId}/places`}>MY PLACES</NavLink>
        </li>
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavLinks;
