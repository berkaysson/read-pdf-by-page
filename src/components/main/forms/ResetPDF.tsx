import React, { useContext } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { Button } from "../../../ui/button";
import { ListRestart } from "lucide-react";

export const ResetPDF = () => {
  const { resetPDF, isFileLoading, activePDFTitle } = useContext(PDFContext);
  return (
    <div>
      <Button
        type="button"
        onClick={resetPDF}
        variant="secondary"
        size={"sm"}
        disabled={isFileLoading || !activePDFTitle}
      >
        <ListRestart className="w-4 h-4 mr-2" />
        Reset
      </Button>
    </div>
  );
};
