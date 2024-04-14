import React, { useContext, useState } from "react";
import { ProfileContext } from "../../../context/profile.context";
import { SavedPdf } from "../../../context/profile.types";

export const AddNewPDF = () => {
  const { addSavedPdf } = useContext(ProfileContext);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedPdf(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedPdf) {
      // Extract necessary information from the selected PDF file
      const newPdf: SavedPdf = {
        title: selectedPdf.name,
        savedPage: 0, // Set initial saved page to 0
        updateDate: new Date().toISOString(), // Set update date to current time
      };

      // Call addSavedPdf function to add or update the PDF in the user profile
      addSavedPdf(newPdf);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
};