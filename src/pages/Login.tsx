import { signInWithGoogle } from "../utilities/signInUtilities";

export const Login: React.FC = () => {
  return (
    <button
      type="button"
      className="float-right btn mr-[40%] mt-10"
      onClick={signInWithGoogle}
    >
      Sign In With Google
    </button>
  );
};
