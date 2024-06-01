import { FirebaseStorage } from "firebase/storage";
import { Dispatch, SetStateAction } from "react";

export interface SavedPdf {
  title: string;
  savedPage: number;
  updateDate: string;
  downloadURL: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  savedPdfs: SavedPdf[];
}

export interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  handleAddSavedPdf: (
    newPdf: SavedPdf,
    file: string[],
    setProgress: Dispatch<SetStateAction<number>>
  ) => void;
  updatePageOfPdf: (title: string, page: number) => void;
  deletePdf: (pdf: SavedPdf, storage: FirebaseStorage) => void;
}
