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
    const credential = await signInWithPopup(auth, provider);

    const userMeta: any = getAdditionalUserInfo(credential);

    if (userMeta?.isNewUser) {
      set(ref(database, `users/${credential.user.uid}`), {
        name: credential.user.displayName,
        createdAt: serverTimestamp(),
        avatar: credential.user.photoURL,
      });
    }

    alert("You have successfully logged in.");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const signInWithGoogle = async (): Promise<void> => {
  await signInWithProvider(new GoogleAuthProvider());
};
