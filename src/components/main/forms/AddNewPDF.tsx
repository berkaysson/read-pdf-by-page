import React, { useContext, useEffect, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { ProfileContext } from "../../../context/profile.context";
import { Card } from "../../../ui/card";
import { validateFile } from "../../../utilities/fileValidation";

import { toast } from "../../../ui/use-toast";

interface AddNewPDFProps {
  isDraggingProp?: boolean;
}

export const AddNewPDF = ({ isDraggingProp = false }: AddNewPDFProps) => {
  const { setNewPDF, isFileLoading, progress, fileLoadingType } =
    useContext(PDFContext);
  const { profile } = useContext(ProfileContext);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const activeDragging = isDragging || isDraggingProp;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const isValid = validateFile(files[0], profile, toast);
      if (isValid) {
        setSelectedPdf(files[0]);
      } else {
        e.target.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const isValid = validateFile(files[0], profile, toast);
      if (isValid) {
        setSelectedPdf(files[0]);
      }
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
        <form
          className="flex flex-col gap-2"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label
            className={`items-center justify-center p-4 text-5xl text-center align-middle rounded-md cursor-pointer text-primary transition-colors duration-200 ${
              activeDragging
                ? "bg-secondary border-2 border-dashed border-primary"
                : "hover:bg-secondary"
            }`}
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
                {isFileLoading
                  ? progress.toFixed(0) + "%"
                  : activeDragging
                    ? "Drop PDF here"
                    : "Add new PDF (or drag & drop)"}
              </div>
            }
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isFileLoading}
            className="hidden"
          />
        </form>
      </Card>
    </div>
  );
};
