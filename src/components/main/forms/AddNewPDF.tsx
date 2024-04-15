import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../../context/profile.context";
import { SavedPdf } from "../../../context/profile.types";
import pdfToText from "../../../utilities/pdfToText.js";
import { PDFContext } from "../../../context/pdf.context";

export const AddNewPDF = () => {
  const { addSavedPdf } = useContext(ProfileContext);
  const { setActivePDFContent, setActivePDFTitle } = useContext(PDFContext);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);

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
      setIsFileLoading(true);
      pdfToText(selectedPdf)
        .then((pdf) => {
          setActivePDFContent(pdf);
          setActivePDFTitle(selectedPdf.name);
          setIsFileLoading(false);
        })
        .catch((error) => console.error("Failed to extract text from pdf"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPdf]);

  return (
    <div className="flex flex-col gap-2">
      <label
        className="items-center justify-center p-4 text-5xl text-center align-middle rounded-md cursor-pointer bg-secondary text-primary hover:opacity-90"
        htmlFor="fileInput"
      >
        {isFileLoading ? "..." : "+"}
      </label>
      <input
        type="file"
        id="fileInput"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <button className="btn" onClick={handleUpload}>
        Save PDF
      </button>
    </div>
  );
};
