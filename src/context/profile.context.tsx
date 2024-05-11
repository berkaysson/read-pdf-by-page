// profile.context.jsx
import { ReactNode, createContext, useState } from "react";
import { auth, database, storage } from "../firebase.config";
import { ProfileContextType, SavedPdf, UserProfile } from "./profile.types";
import { useAuthListener } from "../utilities/useAuthListener";
import {
  addSavedPdf,
  deleteSavedPdf,
  updateSavedPdfSavedPage,
} from "../utilities/pdfUtilities";

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  isLoading: true,
  handleAddSavedPdf: () => {},
  updatePageOfPdf: () => {},
  deletePdf: () => {},
});

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useAuthListener(auth, database, setProfile, setIsLoading);

  const handleAddSavedPdf = async (newPdf: SavedPdf, file: File) => {
    if (profile) {
      const updatedProfile = await addSavedPdf(database, profile, newPdf, file, storage);
      setProfile(updatedProfile);
    }
  };

  const updatePageOfPdf = (title: string, page: number) => {
    if (profile) {
      const updatedProfile = updateSavedPdfSavedPage(
        title,
        page,
        database,
        profile
      );
      setProfile(updatedProfile);
    }
  };

  const deletePdf = async (pdf: SavedPdf) => {
    if (profile) {
      const updatedProfile = await deleteSavedPdf(pdf, database, profile, storage);
      setProfile(updatedProfile);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profile, isLoading, handleAddSavedPdf, updatePageOfPdf, deletePdf }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
