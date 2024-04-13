// authUtils.ts
import { Auth, onAuthStateChanged } from "firebase/auth";
import { Database, off, onValue, ref, set } from "firebase/database";
import { useEffect } from "react";
import { UserProfile } from "../context/profile.types";

export const useAuthListener = (
  auth: Auth,
  database: Database,
  setProfile: (profile: UserProfile | null) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  useEffect(() => {
    let userRef: any;

    const authUnSub = onAuthStateChanged(auth, async (authObj) => {
      if (authObj) {
        userRef = ref(database, `users/${authObj.uid}`);

        onValue(userRef, (snap) => {
          const userData = snap.val();

          if (!userData) {
            const initialProfile: UserProfile = {
              ...userData,
              uid: authObj.uid,
              email: authObj.email,
              savedPdfs: [],
            };
            set(ref(database, `users/${authObj.uid}`), initialProfile);
            setProfile(initialProfile);
          } else {
            setProfile({
              ...userData,
            });
          }

          setIsLoading(false);
        });
      } else {
        // If user is not authenticated
        if (userRef) off(userRef);

        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      authUnSub();

      if (userRef) off(userRef);
    };
  }, []);
};
