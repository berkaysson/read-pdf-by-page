import { auth } from "../firebase.config";

export const logout = () => {
  auth.signOut();
};
