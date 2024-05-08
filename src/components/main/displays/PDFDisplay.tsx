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
    <div className="mt-20">
      <div>
        <h3 className="mb-4 text-2xl font-semibold">
          {activePDFTitle && `${activePDFTitle} - ${activePDFPage}`}
        </h3>
      </div>
      <article className="flex flex-col gap-2 text-justify">
        {pages.map((page, index) => (
          <p
            key={"p" + index}
            id={"page-" + (index + 1)}
            className={index + 1 >= activePDFPage ? "" : "hide-page"}
            lang="tr"
          >
            {page}
            <span aria-hidden="true" className="float-right mt-6 mr-2 text-sm" key={"pageNum-" + index}>{index + 1}</span>
          </p>
        ))}
      </article>
    </div>
  );
};
