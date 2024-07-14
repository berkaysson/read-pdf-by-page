import React, { useContext, useEffect, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { Card } from "../../../ui/card";

export const AddNewPDF = () => {
  const { setNewPDF, isFileLoading, progress, fileLoadingType } =
    useContext(PDFContext);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedPdf(files[0]);
    }
  };

  useEffect(() => {
    if (selectedPdf) {
      setNewPDF(selectedPdf);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPdf]);

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <form className="flex flex-col gap-2">
          <label
            className="items-center justify-center p-4 text-5xl text-center align-middle rounded-md cursor-pointer text-primary hover:bg-secondary"
            htmlFor="fileInput"
          >
            {isFileLoading ? (
              <div
                className={`text-sm mt-2 ${
                  isFileLoading && "motion-safe:animate-bounce"
                }`}
              >
                {fileLoadingType}
                <div
                  className={`${isFileLoading && "motion-safe:animate-spin"}`}
                >
                  |
                </div>
              </div>
            ) : (
              "+"
            )}
            {
              <div
                className="p-2 mt-2 text-xs text-left border-solid rounded text-secondary border-light bg-primary opacity-80"
                style={{ width: `${isFileLoading ? progress : 100}%` }}
              >
                {isFileLoading ? progress.toFixed(0) + "%" : "Add new PDF"}
              </div>
            }
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isFileLoading}
          />
        </form>
      </Card>
    </div>
  );
};
