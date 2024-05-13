import React, { useContext } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { FcDeleteDatabase, FcDownload } from "react-icons/fc";
import { SavedPdf } from "../../../context/profile.types";
import { getPdfFromStorage } from "../../../utilities/pdfUtilities";
import { ProfileContext } from "../../../context/profile.context";
import { storage } from "../../../firebase.config";

interface PDFItemProps {
  pdfItem: SavedPdf;
}

const SavedPDFsListItem: React.FC<PDFItemProps> = ({ pdfItem }) => {
  const { profile, deletePdf } = useContext(ProfileContext);
  const { setNewPDF, isFileLoading, setFileLoadingType, setIsFileLoading } =
    useContext(PDFContext);

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
    <li className="p-2 rounded-md shadow-sm bg-secondary" key={pdfItem.title}>
      <p className="pb-4 overflow-x-auto whitespace-nowrap">{pdfItem.title}</p>
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
  );
};

export default SavedPDFsListItem;
