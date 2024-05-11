import { FirebaseStorage } from "firebase/storage";

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
  handleAddSavedPdf: (newPdf: SavedPdf, file: File) => void;
  updatePageOfPdf: (title: string, page: number) => void;
  deletePdf: (pdf: SavedPdf, storage: FirebaseStorage) => void;
}
