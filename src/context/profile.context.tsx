// profile.context.jsx
import { ReactNode, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth, database } from "../firebase.config";
import { off, onValue, ref } from "firebase/database";

interface UserProfile {
  uid: string;
  email: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  isLoading: true,
});

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  // State initialization for user profile and loading status
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Effect to manage authentication and user profile retrieval
  useEffect(() => {
    let userRef: any; // Reference to the user's data in the database

    // Subscribe to authentication state changes
    const authUnSub = onAuthStateChanged(auth, async (authObj) => {
      // If user is authenticated
      if (authObj) {
        userRef = ref(database, `users/${authObj.uid}`); // Reference to the user's data node

        // Listen for changes to the user's data in the database
        onValue(userRef, (snap) => {
          // Set user profile data and UID/email from database snapshot
          setProfile({ ...snap.val(), uid: authObj.uid, email: authObj.email });
          setIsLoading(false); // Set loading state to false as data is retrieved
        });
      } else {
        // If user is not authenticated
        if (userRef) off(userRef); // Unsubscribe from database changes if reference exists

        // Reset profile data and loading state
        setProfile(null);
        setIsLoading(false);
      }
    });

    // Clean-up function to unsubscribe from authentication and database changes
    return () => {
      authUnSub(); // Unsubscribe from authentication changes

      if (userRef) off(userRef); // Unsubscribe from database changes if reference exists
    };
  }, []); // Empty dependency array ensures this effect runs only on component mount

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};
