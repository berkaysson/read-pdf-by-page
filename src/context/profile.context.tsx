// profile.context.jsx
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { auth, database, storage } from "../firebase.config";
import { ProfileContextType, SavedPdf, UserProfile } from "./profile.types";
import { useAuthListener } from "../utilities/useAuthListener";
import {
  addSavedPdf,
  deleteSavedPdf,
  updateSavedPdfSavedPage,
} from "../utilities/pdfUtilities";
import { useToast } from "../ui/use-toast";

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
  const { toast } = useToast();

  useAuthListener(auth, database, setProfile, setIsLoading);

  const handleAddSavedPdf = useCallback(
    async (
      newPdf: SavedPdf,
      content: string[],
      setProgress: Dispatch<SetStateAction<number>>,
    ) => {
      if (profile) {
        const {
          profile: updatedProfile,
          success,
          message,
        } = await addSavedPdf(
          database,
          profile,
          newPdf,
          content,
          storage,
          setProgress,
        );

        if (!success) {
          toast({
            title: "Error",
            description: message || "Pdf already exists or failed to upload.",
            variant: "destructive",
            duration: 3000,
          });
        } else {
          toast({
            title: "Success",
            description: "Pdf uploaded successfully.",
            duration: 3000,
          });
        }

        setProfile(updatedProfile);
      }
    },
    [profile, toast],
  );

  const updatePageOfPdf = useCallback(
    (title: string, page: number) => {
      if (profile) {
        const { profile: updatedProfile, success } = updateSavedPdfSavedPage(
          title,
          page,
          database,
          profile,
        );

        if (!success) {
          toast({
            title: "Error",
            description: "Please make sure you uploaded the Pdf first.",
            variant: "destructive",
            duration: 3000,
          });
        } else {
          toast({
            title: "Success",
            description: "Page saved successfully.",
            duration: 3000,
          });
        }

        setProfile(updatedProfile);
      }
    },
    [profile, toast],
  );

  const deletePdf = useCallback(
    async (pdf: SavedPdf) => {
      if (profile) {
        const updatedProfile = await deleteSavedPdf(
          pdf,
          database,
          profile,
          storage,
        );
        setProfile(updatedProfile);
      }
    },
    [profile],
  );

  const contextValue = useMemo(
    () => ({
      profile,
      isLoading,
      handleAddSavedPdf,
      updatePageOfPdf,
      deletePdf,
    }),
    [profile, isLoading, handleAddSavedPdf, updatePageOfPdf, deletePdf],
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};
