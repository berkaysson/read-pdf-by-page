import React, { Dispatch, SetStateAction, useContext } from "react";
import { logout } from "../../utilities/signOutUtilities";
import { ProfileContext } from "../../context/profile.context";
import { Link } from "react-router-dom";
import { AddNewPDF } from "../main/forms/AddNewPDF";
import { SavedPDFsList } from "../main/displays/SavedPDFsList";
import { ResetPDF } from "../main/forms/ResetPDF";
import { FcBookmark } from "react-icons/fc";
import { FcMenu } from "react-icons/fc";
import { FcMinus } from "react-icons/fc";

interface NavbarProps {
  isNavOpen: boolean;
  navRef: React.RefObject<HTMLElement>;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  isNavOpen,
  navRef,
  setIsNavOpen,
}) => {
  const { profile } = useContext(ProfileContext);

  const navClass = `${
    isNavOpen ? "left-0" : "-left-3/4 md:-left-1/2"
  } h-screen duration-300 z-50 fixed top-0 w-3/4 md:w-1/2 flex-shrink-0 bg-light text-primary`;
  return (
    <nav aria-hidden="true" className={navClass} ref={navRef}>
      <div className="flex shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] flex-col justify-start gap-4 h-full px-2 py-2 pb-0 overflow-x-hidden overflow-y-scroll">
        <Link
          to="/"
          className="flex items-center justify-center text-3xl font-bold md:text-5xl"
        >
          <FcBookmark className="text-md" /> <span>RPBP</span>
        </Link>
        <div className="flex flex-col justify-between h-[90%]">
          {profile && (
            <>
              <div className="flex flex-col gap-4 h-[60%]">
                <h2 className="text-xl font-semibold">Last Opened Pdfs</h2>
                <SavedPDFsList />
              </div>
              <div className="flex flex-col justify-end gap-6">
                <AddNewPDF />
                <div className="flex flex-row justify-between">
                  <ResetPDF />
                  <button
                    type="button"
                    className="w-1/2 btn btn-alt"
                    onClick={logout}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="absolute top-0 mt-4 -right-14 btn"
        >
          {isNavOpen ? (
            <FcMinus className="text-lg pointer-events-none" />
          ) : (
            <FcMenu className="text-lg pointer-events-none" />
          )}
        </button>
      </div>
    </nav>
  );
};
