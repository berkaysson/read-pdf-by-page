import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { ref, serverTimestamp, set } from "firebase/database";
import { auth, database } from "../firebase.config";

type AuthProviderType = GoogleAuthProvider;

const signInWithProvider = async (
  provider: AuthProviderType
): Promise<void> => {
  try {
    // Attempting to sign in using a popup window with the specified provider
    const credential = await signInWithPopup(auth, provider);

    // Retrieving additional user information from the authentication credential
    const userMeta: any = getAdditionalUserInfo(credential);

    // Checking if the user is new or an existing user
    if (userMeta?.isNewUser) {
      // If the user is new, set up their data in the Firebase Realtime Database
      set(ref(database, `users/${credential.user.uid}`), {
        name: credential.user.displayName,
        createdAt: serverTimestamp(),
        avatar: credential.user.photoURL,
      });
    }

    // Alerting the user about successful login
    alert("You have successfully logged in.");
  } catch (error) {
    // Handling any errors that occur during the authentication process
    console.log(error);
    alert("Something went wrong");
  }
};

export const signInWithGoogle = async (): Promise<void> => {
  await signInWithProvider(new GoogleAuthProvider());
};
