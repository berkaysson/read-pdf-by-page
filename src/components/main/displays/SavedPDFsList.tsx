import React, { useContext } from "react";
import { ProfileContext } from "../../../context/profile.context";
import SavedPDFsListItem from "./SavedPDFsListItem";

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
    <ul className="flex flex-col gap-2 p-1 overflow-y-scroll border-2 rounded-md shadow-md border-secondary">
      {savedPdfsList?.length === 0 && (
        <li className="text-center">No saved PDFs</li>
      )}
      {savedPdfsList?.map((pdfItem) => (
        <SavedPDFsListItem pdfItem={pdfItem} />
      ))}
    </ul>
  );
};
