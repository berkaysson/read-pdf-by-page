import { auth } from "../firebase.config";

export const logout = () => {
  if (auth) {
    try {
      auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  } else {
    console.error('Auth instance is not defined');
  }
};
