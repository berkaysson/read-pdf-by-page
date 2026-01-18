import React, { useContext, useEffect, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";
import Page from "./Page";
import { HowToUseDialog } from "../../navigation/HowToUseDialog";

export const PDFDisplay: React.FC = () => {
  const [pages, setPages] = useState<string[]>([]);
  const { activePDFContent, activePDFTitle, activePDFPage, renderingPage } =
    useContext(PDFContext);

  useEffect(() => {
    if (activePDFContent) {
      setPages([...activePDFContent]);
    } else {
      setPages([]);
    }
  }, [activePDFContent]);

  const progressPercentage =
    pages.length > 0 ? (activePDFPage / pages.length) * 100 : 0;

  return (
    <div className="flex flex-col items-center w-full mt-8 mb-24">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 z-50 h-1 transition-all duration-300 ease-out bg-primary"
        style={{ width: `${progressPercentage}%` }}
      />
      <div>
        {activePDFTitle && (
          <h3 className="mb-4 text-2xl font-semibold">
            {activePDFTitle && `${activePDFTitle}`} - {activePDFPage}/
            {pages.length} - %{progressPercentage.toFixed(0)}
          </h3>
        )}
      </div>
      <article className="flex flex-col gap-4 text-justify ">
        {pages.length < 1 && (
          <span className="italic shadow-inner">
            Add new PDF Please <HowToUseDialog />
          </span>
        )}
        {pages.map((page, index) => (
          <Page
            key={"Page" + index}
            index={index}
            page={page}
            renderingPage={renderingPage}
          />
        ))}
      </article>
    </div>
  );
};
