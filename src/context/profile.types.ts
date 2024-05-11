export interface SavedPdf {
  title: string;
  savedPage: number;
  updateDate: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  savedPdfs: SavedPdf[];
}

export interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  handleAddSavedPdf: (newPdf: SavedPdf) => void;
  updatePageOfPdf: (title: string, page: number) => void;
  deletePdf: (title: string) => void;
}
