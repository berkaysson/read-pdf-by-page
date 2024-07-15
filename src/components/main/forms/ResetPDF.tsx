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
        size={"default"}
        disabled={isFileLoading || !activePDFTitle}
      >
        <ListRestart className={`w-6 h-6 ${windowWidth < 470 ? "" : "mr-2"}`} />
        {windowWidth < 470 ? "" : "Reset"}
      </Button>
    </div>
  );
};
