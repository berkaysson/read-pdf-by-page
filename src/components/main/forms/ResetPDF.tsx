import React, { useContext } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { Button } from "../../../ui/button";
import { ListRestart } from "lucide-react";
import useWindowWidth from "../../../hooks/useWindowWidth";

export const ResetPDF = () => {
  const { resetPDF, isFileLoading, activePDFTitle } = useContext(PDFContext);
  const windowWidth = useWindowWidth();

  return (
    <div>
      <Button
        type="button"
        onClick={resetPDF}
        variant="secondary"
        size={"sm"}
        disabled={isFileLoading || !activePDFTitle}
      >
        <ListRestart className={`w-4 h-4 ${windowWidth < 425 ? "" : "mr-2"}`} />
        {windowWidth < 425 ? "" : "Reset"}
      </Button>
    </div>
  );
};
