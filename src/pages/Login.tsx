import { signInWithGoogle } from "../utilities/signInUtilities";

export const Login: React.FC = () => {
  return <button onClick={signInWithGoogle}>Sign In With Google</button>;
};
