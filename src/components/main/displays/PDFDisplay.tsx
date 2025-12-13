import React, { useContext, useEffect, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";
import Page from "./Page";
import { Button } from "../../../ui/button";
import { Volume2, StopCircle } from "lucide-react";

export const PDFDisplay: React.FC = () => {
  const [pages, setPages] = useState<string[]>([]);
  const { activePDFContent, activePDFTitle, activePDFPage, renderingPage } =
    useContext(PDFContext);

  useEffect(() => {
    if (activePDFContent) {
      setPages([...activePDFContent]);
    } else {
      setPages([]);
    }
  }, [activePDFContent]);

  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    if (!activePDFContent || activePDFContent.length === 0) return;

    setIsReading(true);

    // Cancel anything currently playing
    window.speechSynthesis.cancel();

    activePDFContent.forEach((pageText, index) => {
      const utterance = new SpeechSynthesisUtterance(pageText);
      // Handle end of reading for the last page
      if (index === activePDFContent.length - 1) {
        utterance.onend = () => setIsReading(false);
      }
      utterance.onerror = () => {
        // If error occurs, we might want to stop or just continue.
        // Often canceling triggers error, so we should be careful.
        // For now, simple state reset on error of last chunk is enough.
        if (index === activePDFContent.length - 1) setIsReading(false);
      };
      window.speechSynthesis.speak(utterance);
    });
  };

  return (
    <div className="flex flex-col items-center w-full mt-8 mb-24">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-2xl font-semibold">
          {activePDFTitle && `${activePDFTitle} - ${activePDFPage}`}
        </h3>
        {activePDFContent && activePDFContent.length > 0 && (
          <Button
            variant={isReading ? "destructive" : "default"}
            size="sm"
            onClick={handleReadAloud}
            className="flex items-center gap-2"
          >
            {isReading ? (
              <>
                <StopCircle className="w-4 h-4" />
                Stop Reading
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                Read Aloud
              </>
            )}
          </Button>
        )}
      </div>
      <article className="flex flex-col gap-4 text-justify">
        {pages.length < 1 && (
          <span className="italic shadow-inner">Add new PDF Please</span>
        )}
        {pages.map((page, index) => (
          <Page
            key={"Page" + index}
            index={index}
            page={page}
            renderingPage={renderingPage}
          />
        ))}
      </article>
    </div>
  );
};
