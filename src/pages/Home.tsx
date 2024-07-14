import React from "react";
import { PDFDisplay } from "../components/main/displays/PDFDisplay";
import PdfMenuBar from "../components/navigation/PdfMenuBar";
import LoadingModal from "../components/main/displays/LoadingModal";
import { Toaster } from "../ui/toaster";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-center gap-8 align-middle">
      <LoadingModal />
      <PdfMenuBar />
      <PDFDisplay />
      <Toaster />
    </div>
  );
};
