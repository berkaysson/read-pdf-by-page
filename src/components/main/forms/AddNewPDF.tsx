import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../../context/profile.context";
import { SavedPdf } from "../../../context/profile.types";
import pdfToText from "../../../utilities/pdfToText.js";
import { PDFContext } from "../../../context/pdf.context";
import { FcAddDatabase } from "react-icons/fc";

export const AddNewPDF = () => {
  const { handleAddSavedPdf } = useContext(ProfileContext);
  const { activePDFTitle, setActivePDFContent, setActivePDFTitle } =
    useContext(PDFContext);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(100);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedPdf(files[0]);
    }
  };

  const handleSave = () => {
    if (selectedPdf) {
      const newPdf: SavedPdf = {
        title: selectedPdf.name,
        savedPage: 0,
        updateDate: new Date().toISOString(),
      };

      handleAddSavedPdf(newPdf);
    }
  };

  useEffect(() => {
    if (selectedPdf) {
      setIsFileLoading(true);
      pdfToText(selectedPdf, setProgress)
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
      <form className="flex flex-col gap-2">
        <label
          className="items-center shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] justify-center p-4 text-5xl text-center align-middle rounded-md cursor-pointer bg-secondary text-primary hover:opacity-90"
          htmlFor="fileInput"
        >
          {isFileLoading ? "..." : "+"}
          {
            <div
              className="p-2 mt-2 text-xs text-left border-solid rounded text-secondary border-light bg-primary opacity-80"
              style={{ width: `${progress}%` }}
            >
              {isFileLoading ? progress.toFixed(0) + "%" : "Add new PDF"}
            </div>
          }
        </label>
        <input
          type="file"
          id="fileInput"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isFileLoading}
        />
        <button
          className="flex items-center justify-center gap-2 btn"
          onClick={handleSave}
          disabled={activePDFTitle === "" || !activePDFTitle}
          type="button"
        >
          <FcAddDatabase className="text-lg" />
          <span>Save PDF</span>
        </button>
      </form>
    </div>
  );
};
