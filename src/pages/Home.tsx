import React from "react";
import { PageInputForm } from "../components/main/forms/PageInputForm";
import { PDFDisplay } from "../components/main/displays/PDFDisplay";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-center gap-8 align-middle">
      <PageInputForm />
      <PDFDisplay />
    </div>
  );
};
