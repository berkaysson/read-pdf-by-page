import { Dispatch, SetStateAction } from "react";

export interface PDFContextType {
  activePDFContent: string[] | null;
  setActivePDFContent: Dispatch<SetStateAction<string[] | null>>;
  activePDFTitle: string | null;
  setActivePDFTitle: Dispatch<SetStateAction<string | null>>;
  activePDFPage: number;
  setActivePDFPage: Dispatch<SetStateAction<number>>;
  resetPDF: () => void;
}
