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
        <h3>{activePDFTitle && `${activePDFTitle} - ${activePDFPage}`}</h3>
      </div>
      <article>
        {pages.map((page, index) => (
          <p
            key={"p" + index}
            id={"page-" + (index + 1)}
            className={index + 1 >= activePDFPage ? "" : "hide-page"}
          >
            {page}
          </p>
        ))}
      </article>
    </div>
  );
};
