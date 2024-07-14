import { CircleX } from "lucide-react";
import { Button } from "../../../ui/button";
import React from "react";

interface AreYouSureProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const AreYouSure: React.FC<AreYouSureProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const handleClick = (
    onMethod: () => void,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    onMethod();
  };

  return (
    <div className="z-50">
      <div className="flex flex-row gap-1 mx-2">
        <Button
          variant={"default"}
          size={"sm"}
          type="button"
          onClick={(e) => handleClick(onCancel, e)}
        >
          <CircleX className="w-4 h-4" />
        </Button>
        <Button
          variant={"destructive"}
          size={"sm"}
          type="button"
          onClick={(e) => handleClick(onConfirm, e)}
        >
          {message}
        </Button>
      </div>
    </div>
  );
};

export default AreYouSure;
