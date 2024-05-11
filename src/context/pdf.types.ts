import { Dispatch, SetStateAction } from "react";

export type FileLoadingType =
  | "Extracting text..."
  | "Downloading..."
  | "Uploading..."
  | "...";

export interface PDFContextType {
  activePDFContent: string[] | null;
  setActivePDFContent: Dispatch<SetStateAction<string[] | null>>;
  activePDFTitle: string | null;
  setActivePDFTitle: Dispatch<SetStateAction<string | null>>;
  activePDFPage: number;
  setActivePDFPage: Dispatch<SetStateAction<number>>;
  resetPDF: () => void;
  setNewPDF: (newPdf: File) => void;
  isFileLoading: boolean;
  progress: number;
  setIsFileLoading: Dispatch<SetStateAction<boolean>>;
  setProgress: Dispatch<SetStateAction<number>>;
  setFileLoadingType: Dispatch<SetStateAction<FileLoadingType>>;
  fileLoadingType: FileLoadingType;
}
