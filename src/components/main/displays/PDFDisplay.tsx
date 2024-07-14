import React, { useContext, useEffect, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";

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
    <div className="mt-8 mb-24">
      <div>
        <h3 className="mb-4 text-2xl font-semibold">
          {activePDFTitle && `${activePDFTitle} - ${activePDFPage}`}
        </h3>
      </div>
      <article className="flex flex-col gap-4 text-justify bg-secondary">
        {pages.length<1 && <span className="italic shadow-inner">Add new PDF Please</span>}
        {pages.map((page, index) => (
          <p
            key={"p" + index}
            id={"page-" + (index + 1)}
            className={index + 1 >= activePDFPage ? " bg-light px-4 py-10 rounded-sm shadow-inner" : "hide-page"}
            lang="tr"
          >
            {page}
            <span aria-hidden="true" className="float-right mt-6 mr-2 text-sm italic" key={"pageNum-" + index}>{index + 1}</span>
          </p>
        ))}
      </article>
    </div>
  );
};
