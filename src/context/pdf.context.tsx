import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { PDFContextType } from "./pdf.types";
import { ProfileContext } from "./profile.context";

export const PDFContext = createContext<PDFContextType>({
  activePDFContent: null,
  setActivePDFContent: () => {},
  activePDFTitle: null,
  setActivePDFTitle: () => {},
  activePDFPage: 0,
  resetPDF: () => {},
});

interface PDFProviderProps {
  children: ReactNode;
}

export const PDFProvider = ({ children }: PDFProviderProps) => {
  const { profile } = useContext(ProfileContext);

  const [activePDFContent, setActivePDFContent] = useState<string[] | null>(
    null
  );
  const [activePDFTitle, setActivePDFTitle] = useState<string | null>(null);
  const [activePDFPage, setActivePDFPage] = useState<number>(0);

  useEffect(() => {
    if (profile) {
      for (const pdf of profile.savedPdfs) {
        if (pdf.title === activePDFTitle) {
          setActivePDFPage(pdf.savedPage);
        }
      }
    }
  }, [profile, activePDFTitle]);

  const resetPDF = () => {
    setActivePDFContent(null);
    setActivePDFTitle(null);
    setActivePDFPage(0);
    const fileInput = document.getElementById("fileInput");
    if (fileInput instanceof HTMLInputElement) fileInput.value = "";
  };

  return (
    <PDFContext.Provider
      value={{
        activePDFContent,
        setActivePDFContent,
        activePDFTitle,
        setActivePDFTitle,
        activePDFPage,
        resetPDF,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};
