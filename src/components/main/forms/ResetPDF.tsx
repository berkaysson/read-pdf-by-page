import React, { useContext } from "react";
import { PDFContext } from "../../../context/pdf.context";

export const ResetPDF = () => {
  const { resetPDF, isFileLoading } = useContext(PDFContext);
  return (
    <div>
      <button
        disabled={isFileLoading}
        className="btn btn-alt"
        type="button"
        onClick={resetPDF}
      >
        Reset PDF
      </button>
    </div>
  );
};
