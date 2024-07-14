import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { signInWithGoogle } from "../utilities/signInUtilities";

export const Login: React.FC = () => {
  return (
    <Button
      type="button"
      className="flex w-full"
      onClick={signInWithGoogle}
      size={"lg"}
      variant={"outline"}
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign In With Google
    </Button>
  );
};
