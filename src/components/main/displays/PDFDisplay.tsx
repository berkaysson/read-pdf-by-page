import React, { useContext, useEffect, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";
import GoUpButton from "../../navigation/GoUpButton";
import Page from "./Page";

export const PDFDisplay: React.FC = () => {
  const [pages, setPages] = useState<string[]>([]);
  const { activePDFContent, activePDFTitle, activePDFPage } =
    useContext(PDFContext);

  useEffect(() => {
    if (activePDFContent) {
      setPages([...activePDFContent]);
    } else {
      setPages([]);
    }
  }, [activePDFContent]);

  return (
    <div className="flex flex-col items-center w-full mt-8 mb-24">
      <div>
        <h3 className="mb-4 text-2xl font-semibold">
          {activePDFTitle && `${activePDFTitle} - ${activePDFPage}`}
        </h3>
      </div>
      <article className="flex flex-col gap-4 text-justify">
        {pages.length < 1 && (
          <span className="italic shadow-inner">Add new PDF Please</span>
        )}
        {pages.map((page, index) => (
          <Page
            key={"Page" + index}
            index={index}
            page={page}
            activePDFPage={activePDFPage}
          />
        ))}
      </article>
      <GoUpButton />
    </div>
  );
};
