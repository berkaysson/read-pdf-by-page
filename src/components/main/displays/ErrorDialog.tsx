import { useContext, useEffect, useRef } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { Card } from "../../../ui/card";
import { Button } from "../../../ui/button";

const ErrorDialog = () => {
  const { error, setError } = useContext(PDFContext);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (error) {
        if (!dialog.open) dialog.showModal();
      } else {
        if (dialog.open) dialog.close();
      }
    }
  }, [error]);

  const handleClose = () => {
    setError(null);
  };

  if (!error) return null;

  return (
    <dialog
      ref={dialogRef}
      className="p-0 backdrop:bg-black/50 bg-transparent rounded-lg shadow-xl"
      onCancel={handleClose}
    >
      <Card className="min-w-[300px] max-w-md p-6 bg-card text-card-foreground">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-destructive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3 className="font-semibold text-lg">Error</h3>
          </div>

          <p className="text-sm text-muted-foreground break-words">{error}</p>

          <div className="flex justify-end mt-2">
            <Button onClick={handleClose} variant="destructive">
              Close
            </Button>
          </div>
        </div>
      </Card>
    </dialog>
  );
};

export default ErrorDialog;
