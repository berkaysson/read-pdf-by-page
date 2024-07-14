import React, { useContext, useEffect, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { ProfileContext } from "../../../context/profile.context";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { BookMarked } from "lucide-react";

export const PageInputForm = () => {
  const [pageNumber, setPageNumber] = useState<number | null>(null);
  const { activePDFTitle, setActivePDFPage } = useContext(PDFContext);
  const { updatePageOfPdf } = useContext(ProfileContext);

  const handlePageNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    setPageNumber(isNaN(value) ? null : value);
  };

  const handleSavePageButton = () => {
    if (activePDFTitle && pageNumber) {
      updatePageOfPdf(activePDFTitle, pageNumber);
    }
    else {
      alert("PDF or page number is missing");
    }
  };

  useEffect(() => {
    if (pageNumber) {
      setActivePDFPage(pageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    setActivePDFPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePDFTitle]);

  return (
    <div className="flex flex-row ml-2">
      <form className="flex flex-row space-x-1">
        <Input
          disabled={!activePDFTitle}
          type="number"
          placeholder="Go"
          required
          min="0"
          name="pageNum"
          onChange={handlePageNumberChange}
          className="w-14 placeholder:text-xs opacity-90 focus:opacity-100"
        />
        <Button
          variant={"secondary"}
          onClick={handleSavePageButton}
          type="button"
          size={"sm"}
          disabled={!pageNumber || !activePDFTitle}
        >
          <BookMarked className="w-4 h-4 mr-2" />
          Save
        </Button>
      </form>
    </div>
  );
};
