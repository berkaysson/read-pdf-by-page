import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FileLoadingType, PDFContextType } from "./pdf.types";
import { ProfileContext } from "./profile.context";
import pdfToText from "../utilities/pdfToText";

export const PDFContext = createContext<PDFContextType>({
  activePDFContent: null,
  setActivePDFContent: () => {},
  activePDFTitle: null,
  setActivePDFTitle: () => {},
  activePDFPage: 0,
  setActivePDFPage: () => {},
  resetPDF: () => {},
  setNewPDF: () => {},
  isFileLoading: false,
  progress: 0,
  setIsFileLoading: () => {},
  setProgress: () => {},
  setFileLoadingType: () => {},
  fileLoadingType: "...",
  setRenderingPage: () => {},
  renderingPage: 1,
  error: null,
  setError: () => {},
});

interface PDFProviderProps {
  children: ReactNode;
}

export const PDFProvider = ({ children }: PDFProviderProps) => {
  const { profile } = useContext(ProfileContext);

  const [activePDFContent, setActivePDFContent] = useState<string[] | null>(
    null,
  );
  const [activePDFTitle, setActivePDFTitle] = useState<string | null>(null);
  const [activePDFPage, setActivePDFPage] = useState<number>(0);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
  const [renderingPage, setRenderingPage] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [fileLoadingType, setFileLoadingType] =
    useState<FileLoadingType>("...");
  const [error, setError] = useState<string | null>(null);

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
    setProgress(0);
    setIsFileLoading(false);
    setFileLoadingType("...");
    setError(null);
    setRenderingPage(1);
    const fileInput = document.getElementById("fileInput");
    if (fileInput instanceof HTMLInputElement) fileInput.value = "";
  };

  const setNewPDF = async (newPdf: File | null) => {
    if (newPdf === null) {
      console.error("setNewPDF was called with a null File.");
      return;
    }
    setError(null);
    setIsFileLoading(true);
    setFileLoadingType("Extracting text...");
    if (newPdf.type === "application/json") {
      setActivePDFTitle(newPdf?.name.replace(".json", "") ?? "Unknown File");
      const pdfContent = JSON.parse(await newPdf.text());
      setActivePDFContent(pdfContent);
      setIsFileLoading(false);
    } else if (newPdf.type === "application/pdf") {
      pdfToText(newPdf, setProgress)
        .then((pdf) => {
          setActivePDFContent(pdf);
          setActivePDFTitle(newPdf?.name.replace(".pdf", "") ?? "Unknown File");
          setIsFileLoading(false);
        })
        .catch((error: Error) => {
          console.error("Failed to extract text from pdf", error);
          setError(error.message || "Failed to extract text from PDF");
          setIsFileLoading(false);
        });
    }
  };

  const contextValue = useMemo(
    () => ({
      activePDFContent,
      setActivePDFContent,
      activePDFTitle,
      setActivePDFTitle,
      activePDFPage,
      setActivePDFPage,
      resetPDF,
      setNewPDF,
      isFileLoading,
      progress,
      setIsFileLoading,
      setProgress,
      setFileLoadingType,
      fileLoadingType,
      renderingPage,
      setRenderingPage,
      error,
      setError,
    }),
    [
      activePDFContent,
      activePDFTitle,
      activePDFPage,
      isFileLoading,
      progress,
      fileLoadingType,
      renderingPage,
      error,
    ],
  );

  return (
    <PDFContext.Provider value={contextValue}>{children}</PDFContext.Provider>
  );
};
