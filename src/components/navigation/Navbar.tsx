import React, { useContext } from "react";
import { logout } from "../../utilities/signOutUtilities";
import { ProfileContext } from "../../context/profile.context";
import { Link } from "react-router-dom";
import { AddNewPDF } from "../main/forms/AddNewPDF";
import { SavedPDFsList } from "../main/displays/SavedPDFsList";
import { ResetPDF } from "../main/forms/ResetPDF";

export const Navbar = () => {
  const { profile } = useContext(ProfileContext);
  return (
    <nav>
      <Link to="/">Logo</Link>
      {profile && (
        <>
          <div>
            <h2>Last Pdfs</h2>
            <SavedPDFsList />
          </div>
          <div>
            <AddNewPDF />
            <ResetPDF />
          </div>
          <button onClick={logout}>Log Out</button>
        </>
      )}
    </nav>
  );
};
