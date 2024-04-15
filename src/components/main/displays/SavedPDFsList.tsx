import React, { useContext } from "react";
import { ProfileContext } from "../../../context/profile.context";

export const SavedPDFsList: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  const savedPdfsList = profile?.savedPdfs;
  if (savedPdfsList) {
    savedPdfsList.sort(
      (a, b) =>
        new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {savedPdfsList?.map((pdfItem, index) => (
        <li
          className="p-2 rounded-md shadow-sm bg-secondary"
          key={"pdfItem" + index}
        >
          <p className="pb-4 overflow-x-auto whitespace-nowrap">
            {pdfItem.title}
          </p>
          Page:
          <span className="font-bold"> {pdfItem.savedPage}</span>
        </li>
      ))}
    </ul>
  );
};
