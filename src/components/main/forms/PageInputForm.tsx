import React, { useContext, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { ProfileContext } from "../../../context/profile.context";

export const PageInputForm = () => {
  const [pageNumber, setPageNumber] = useState<number | null>(null);
  const { activePDFTitle } = useContext(PDFContext);
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

  return (
    <div className="flex flex-row">
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
        <button className="btn" onClick={handleSavePageButton} type="button">
          Save
        </button>
      </form>
    </div>
  );
};
