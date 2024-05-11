// profile.context.jsx
import { ReactNode, createContext, useState } from "react";
import { auth, database } from "../firebase.config";
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

  const handleAddSavedPdf = (newPdf: SavedPdf) => {
    if (profile) {
      const updatedProfile = addSavedPdf(database, profile, newPdf);
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

  const deletePdf = (title: string) => {
    if (profile) {
      const updatedProfile = deleteSavedPdf(title, database, profile);
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
