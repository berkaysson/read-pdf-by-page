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
        <button
          type="button"
          onClick={(e) => handleClick(onCancel, e)}
          className="btn"
        >
          No
        </button>
        <button
          type="button"
          onClick={(e) => handleClick(onConfirm, e)}
          className="btn btn-alt"
        >
          {message}
        </button>
      </div>
    </div>
  );
};

export default AreYouSure;
