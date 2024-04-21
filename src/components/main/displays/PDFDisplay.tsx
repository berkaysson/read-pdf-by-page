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
    <div>
      <div>
        <h3 className="mb-4 text-2xl font-semibold">
          {activePDFTitle && `${activePDFTitle} - ${activePDFPage}`}
        </h3>
      </div>
      <article className="flex flex-col gap-2">
        {pages.map((page, index) => (
          <p
            key={"p" + index}
            id={"page-" + (index + 1)}
            className={index + 1 >= activePDFPage ? "" : "hide-page"}
          >
            {page}
            <span className="float-right mt-6 mr-6 text-sm" key={"pageNum-" + index}>{index + 1}</span>
          </p>
        ))}
      </article>
    </div>
  );
};
