import React, { useContext } from "react";
import { PDFContext } from "../../../context/pdf.context";

export const ResetPDF = () => {
  const { resetPDF } = useContext(PDFContext);
  return (
    <div>
      <button className="btn" type="button" onClick={resetPDF}>
        Reset PDF
      </button>
    </div>
  );
};