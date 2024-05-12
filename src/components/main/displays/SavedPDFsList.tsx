import React, { useContext } from "react";
import { ProfileContext } from "../../../context/profile.context";
import { FcDeleteDatabase } from "react-icons/fc";
import { SavedPdf } from "../../../context/profile.types";
import { storage } from "../../../firebase.config";
import { getPdfFromStorage } from "../../../utilities/pdfUtilities";
import { PDFContext } from "../../../context/pdf.context";
import { FcDownload } from "react-icons/fc";

export const SavedPDFsList: React.FC = () => {
  const { profile, deletePdf } = useContext(ProfileContext);
  const { setNewPDF, isFileLoading, setFileLoadingType, setIsFileLoading } =
    useContext(PDFContext);
  const savedPdfsList = profile?.savedPdfs;
  if (savedPdfsList) {
    savedPdfsList.sort(
      (a, b) =>
        new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
    );
  }

  const handleDelete = (pdf: SavedPdf) => {
    deletePdf(pdf, storage);
  };

  const handleDownload = async (pdf: SavedPdf) => {
    if (!profile) return;
    setIsFileLoading(true);
    setFileLoadingType("Downloading...");
    const downloadedPdf = await getPdfFromStorage(profile, pdf, storage);
    if (downloadedPdf) setNewPDF(downloadedPdf);
  };

  return (
    <ul className="flex flex-col gap-2 p-1 overflow-y-scroll border-2 rounded-md shadow-md border-secondary">
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
          <button
            disabled={isFileLoading}
            onClick={() => handleDelete(pdfItem)}
            className="float-right mt-1 btn btn-alt"
            type="button"
          >
            <FcDeleteDatabase className="text-lg" />{" "}
          </button>
          <button
            type="button"
            disabled={isFileLoading}
            className="float-right mt-1 mr-1 btn btn-alt"
            onClick={() => handleDownload(pdfItem)}
          >
            <FcDownload className="text-lg" />{" "}
          </button>
        </li>
      ))}
    </ul>
  );
};
