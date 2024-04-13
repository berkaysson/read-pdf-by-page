// profile.context.jsx
import { ReactNode, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth, database } from "../firebase.config";
import { off, onValue, ref, set } from "firebase/database";
import { ProfileContextType, UserProfile } from "./profile.types";
import { useAuthListener } from "../utilities/useAuthListener";

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  isLoading: true,
});

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useAuthListener(auth, database, setProfile, setIsLoading);

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};
