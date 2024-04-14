import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../../context/profile.context";
import { SavedPdf } from "../../../context/profile.types";
import pdfToText from "../../../utilities/pdfToText.js";
import { PDFContext } from "../../../context/pdf.context";

export const AddNewPDF = () => {
  const { addSavedPdf } = useContext(ProfileContext);
  const { setActivePDFContent, setActivePDFTitle } = useContext(PDFContext);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedPdf(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedPdf) {
      const newPdf: SavedPdf = {
        title: selectedPdf.name,
        savedPage: 0,
        updateDate: new Date().toISOString(),
      };

      addSavedPdf(newPdf);
    }
  };

  useEffect(() => {
    if (selectedPdf) {
      pdfToText(selectedPdf)
        .then((pdf) => {
          setActivePDFContent(pdf)
          setActivePDFTitle(selectedPdf.name);
        })
        .catch((error) => console.error("Failed to extract text from pdf"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPdf]);

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Save PDF</button>
    </div>
  );
};
