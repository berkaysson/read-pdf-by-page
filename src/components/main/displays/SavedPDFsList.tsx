import React, { useContext } from "react";
import { ProfileContext } from "../../../context/profile.context";

export const SavedPDFsList: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  const savedPdfsList = profile?.savedPdfs;
  return (
    <ul>
      {savedPdfsList?.map((pdfItem, index) => (
        <li key={"pdfItem" + index}>{pdfItem.title}-{pdfItem.savedPage}</li>
      ))}
    </ul>
  );
};
