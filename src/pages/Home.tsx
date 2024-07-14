import React from "react";
import { PDFDisplay } from "../components/main/displays/PDFDisplay";
import PdfMenuBar from "../components/navigation/PdfMenuBar";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-center gap-8 align-middle">
      <PdfMenuBar />
      <PDFDisplay />
    </div>
  );
};
