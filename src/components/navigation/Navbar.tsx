import React, { useContext } from "react";
import { logout } from "../../utilities/signOutUtilities";
import { ProfileContext } from "../../context/profile.context";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { profile } = useContext(ProfileContext);
  return (
    <nav>
      <Link to="/">Logo</Link>
      {profile && (
        <>
          <div>
            <h2>Last Pdfs</h2>
            <ul>List of pdf title and saved page</ul>
          </div>
          <div>
            <button>Add new</button>
          </div>
          <button onClick={logout}>Log Out</button>
        </>
      )}
    </nav>
  );
};