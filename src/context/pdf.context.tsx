import { ReactNode, createContext, useState } from "react";
import { PDFContextType } from "./pdf.types";

export const PDFContext = createContext<PDFContextType>({
  activePDFContent: null,
  setActivePDFContent: () => {},
  activePDFTitle: null,
  setActivePDFTitle: () => {},
});

interface PDFProviderProps {
  children: ReactNode;
}

export const PDFProvider = ({ children }: PDFProviderProps) => {
  const [activePDFContent, setActivePDFContent] = useState<string[] | null>(
    null
  );
  const [activePDFTitle, setActivePDFTitle] = useState<string | null>(null);

  return (
    <PDFContext.Provider
      value={{
        activePDFContent,
        setActivePDFContent,
        activePDFTitle,
        setActivePDFTitle,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};
