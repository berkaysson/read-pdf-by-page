import React, { useContext, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { FcDeleteDatabase, FcDownload } from "react-icons/fc";
import { SavedPdf } from "../../../context/profile.types";
import { getPdfFromStorage } from "../../../utilities/pdfUtilities";
import { ProfileContext } from "../../../context/profile.context";
import { storage } from "../../../firebase.config";
import AreYouSure from "../forms/AreYouSure";
import { Button } from "../../../ui/button";
import { FileDown, FileX2 } from "lucide-react";

interface PDFItemProps {
  pdfItem: SavedPdf;
}

const SavedPDFsListItem: React.FC<PDFItemProps> = ({ pdfItem }) => {
  const { profile, deletePdf } = useContext(ProfileContext);
  const {
    setNewPDF,
    isFileLoading,
    setFileLoadingType,
    setIsFileLoading,
    setProgress,
  } = useContext(PDFContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = (pdf: SavedPdf) => {
    deletePdf(pdf, storage);
    setShowConfirm(false);
  };

  const handleDownload = async (pdf: SavedPdf) => {
    if (!profile) return;
    setIsFileLoading(true);
    setFileLoadingType("Downloading...");
    const downloadedPdf = await getPdfFromStorage(profile, pdf, storage);
    if (downloadedPdf) {
      setProgress(50);
      setNewPDF(downloadedPdf);
    }
  };

  const handleDeleteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setShowConfirm(true);
  };

  return (
    <li className="p-2 rounded-md shadow-sm bg-secondary" key={pdfItem.title}>
      <p className="overflow-x-auto whitespace-nowrap">{pdfItem.title}</p>
      <p className="font-bold">Page: {pdfItem.savedPage}</p>
      {showConfirm && !isFileLoading ? (
        <span className="float-right mt-1">
          <AreYouSure
            message="Delete PDF"
            onCancel={() => setShowConfirm(false)}
            onConfirm={() => handleDelete(pdfItem)}
          />
        </span>
      ) : (
        <Button
          disabled={isFileLoading}
          onClick={(event) => handleDeleteButtonClick(event)}
          className="float-right mt-1"
          type="button"
          variant={"destructive"}
          size={"sm"}
        >
          <FileX2 className="w-4 h-4" />
        </Button>
      )}
      <Button
        type="button"
        disabled={isFileLoading}
        className="float-right mt-1 mr-1"
        onClick={() => handleDownload(pdfItem)}
        size={"sm"}
        variant={"default"}
      >
        <FileDown className="w-4 h-4" />
      </Button>
    </li>
  );
};

export default SavedPDFsListItem;
