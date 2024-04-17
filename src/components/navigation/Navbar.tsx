import React, { Dispatch, SetStateAction, useContext } from "react";
import { logout } from "../../utilities/signOutUtilities";
import { ProfileContext } from "../../context/profile.context";
import { Link } from "react-router-dom";
import { AddNewPDF } from "../main/forms/AddNewPDF";
import { SavedPDFsList } from "../main/displays/SavedPDFsList";
import { ResetPDF } from "../main/forms/ResetPDF";

interface NavbarProps {
  isNavOpen: boolean;
  navRef: React.RefObject<HTMLElement>;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
}

export const Navbar: React.FC<NavbarProps> = ({ isNavOpen, navRef, setIsNavOpen }) => {
  const { profile } = useContext(ProfileContext);

  const navClass = `${
    isNavOpen ? "left-0" : "-left-3/4 md:-left-1/2"
  } h-screen duration-300 z-50 fixed top-0 w-3/4 md:w-1/2 flex-shrink-0 bg-light text-primary`;
  return (
    <nav className={navClass} ref={navRef}>
      <div className="flex shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] flex-col justify-between gap-4 h-full px-4 py-4 overflow-x-hidden overflow-y-auto align-middle">
        <Link to="/" className="text-3xl font-bold md:text-5xl">
          RPBP
        </Link>
        {profile && (
          <>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Last Opened Pdfs</h2>
              <SavedPDFsList />
            </div>
            <div className="flex flex-col gap-4">
              <AddNewPDF />
              <ResetPDF />
            </div>
            <button className="btn btn-alt" onClick={logout}>
              Log Out
            </button>
          </>
        )}
      </div>
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="absolute top-0 mt-4 -right-14 btn"
      >
        {isNavOpen ? "x":"+"}
      </button>
    </nav>
  );
};
