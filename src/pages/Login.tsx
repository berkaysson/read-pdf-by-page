import { signInWithGoogle } from "../utilities/signInUtilities";

export const Login: React.FC = () => {
  return <button className="btn" onClick={signInWithGoogle}>Sign In With Google</button>;
};
