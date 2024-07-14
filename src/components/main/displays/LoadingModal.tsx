import { Card } from "../../../ui/card";
import { PDFContext } from "../../../context/pdf.context";
import { useContext, useEffect, useRef, useState } from "react";

const LoadingModal = () => {
  const { isFileLoading, progress, fileLoadingType } = useContext(PDFContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
    setModalOpen(isFileLoading);
  }, [isFileLoading, isModalOpen]);

  return (
    <dialog ref={modalRef} className="rounded-md">
      <Card className="p-4 w-60">
        <div className="flex flex-col items-center mt-2 text-sm motion-safe:animate-bounce">
          {fileLoadingType}
          <div className="w-0 motion-safe:animate-spin">|</div>
        </div>

        <div
          className="p-2 mt-2 text-xs text-left border-solid rounded text-secondary border-light bg-primary opacity-80"
          style={{ width: `${progress}%` }}
        >
          {progress.toFixed(0) + "%"}
        </div>
      </Card>
    </dialog>
  );
};

export default LoadingModal;
