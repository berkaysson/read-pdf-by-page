import React, { useContext, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { ProfileContext } from "../../../context/profile.context";

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
  };

  const handleGoToPageClick = () => {
    if (pageNumber) {
      setActivePDFPage(pageNumber);
    }
  };

  return (
    <div className="fixed flex flex-row px-4 py-2 border-2 rounded-sm shadow-md border-light bottom-2 md:bottom-4 bg-secondary right-2">
      <form className="flex flex-row justify-center w-full gap-4">
        <label htmlFor="pageNum" className="flex flex-col gap-2 text-sm">
          Enter Page Number:
          <input
            type="number"
            placeholder="enter to save page"
            required
            min="0"
            name="pageNum"
            className="border-2 border-solid input"
            onChange={handlePageNumberChange}
          />
        </label>
        <div className="flex flex-col gap-2">
          <button type="button" className="btn" onClick={handleGoToPageClick}>
            Go
          </button>
          <button className="btn" onClick={handleSavePageButton} type="button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
