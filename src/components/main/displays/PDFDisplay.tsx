import React, { useContext, useEffect, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";

export const PDFDisplay: React.FC = () => {
  const [pages, setPages] = useState<string[]>([]);
  const { activePDFContent } = useContext(PDFContext);

  useEffect(() => {
    if (activePDFContent) {
      setPages([...activePDFContent]);
    } else {
      setPages([]);
    }
  }, [activePDFContent]);

  return (
    <div>
      {pages.map((page, index) => (
        <>
          <p key={index} id={"page-" + (index + 1)}>
            {page}
          </p>
          <br key={"break"+index} />
        </>
      ))}
    </div>
  );
};
