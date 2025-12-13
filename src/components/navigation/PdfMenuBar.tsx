import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { PageInputForm } from "../../components/main/forms/PageInputForm";
import { useContext, useEffect, useState } from "react";
import { PDFContext } from "../../context/pdf.context";
import { ProfileContext } from "../../context/profile.context";
import { SavedPdf } from "../../context/profile.types";
import { Button } from "../../ui/button";
import { FileUp, Info, StopCircle, Volume2 } from "lucide-react";
import { ResetPDF } from "../main/forms/ResetPDF";
import useWindowWidth from "../../hooks/useWindowWidth";
import GoUpButton from "./GoUpButton";

const PdfMenuBar = () => {
  const { handleAddSavedPdf } = useContext(ProfileContext);
  const {
    activePDFTitle,
    setProgress,
    setIsFileLoading,
    setFileLoadingType,
    activePDFContent,
    renderingPage,
  } = useContext(PDFContext);

  const windowWidth = useWindowWidth();

  // Read Aloud Logic
  const [isReading, setIsReading] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    if (!activePDFContent || activePDFContent.length === 0) return;

    // Select the best voice
    let selectedVoice = voices.find(
      (v) =>
        v.name.includes("Microsoft") &&
        v.name.includes("Natural") &&
        v.lang.includes("en")
    );

    if (!selectedVoice) {
      selectedVoice = voices.find((v) => v.name.includes("Google US English"));
    }

    if (!selectedVoice) {
      // Fallback to first English voice
      selectedVoice = voices.find((v) => v.lang.startsWith("en"));
    }

    setIsReading(true);
    window.speechSynthesis.cancel();

    const startIndex = (renderingPage > 0 ? renderingPage : 1) - 1;

    activePDFContent.forEach((pageText, index) => {
      if (index < startIndex) return;

      const utterance = new SpeechSynthesisUtterance(pageText);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Handle end of reading for the last page
      if (index === activePDFContent.length - 1) {
        utterance.onend = () => setIsReading(false);
      }
      utterance.onerror = () => {
        if (index === activePDFContent.length - 1) setIsReading(false);
      };
      window.speechSynthesis.speak(utterance);
    });
  };

  const handleSave = async () => {
    if (activePDFContent && activePDFTitle) {
      setIsFileLoading(true);
      setFileLoadingType("Uploading...");
      const newPdf: SavedPdf = {
        title: activePDFTitle,
        savedPage: 0,
        updateDate: new Date().toISOString(),
        downloadURL: "",
      };
      await handleAddSavedPdf(newPdf, activePDFContent, setProgress);
      setProgress(100);
      setIsFileLoading(false);
    }
  };
  return (
    <NavigationMenu
      aria-hidden="true"
      className="fixed bottom-0 p-2 mb-2 -translate-x-1/2 rounded-md shadow-sm left-1/2 bg-primary"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <Button
            onClick={handleSave}
            disabled={activePDFTitle === "" || !activePDFTitle}
            type="button"
            variant="secondary"
            size={"default"}
          >
            <FileUp className={`w-6 h-6 ${windowWidth < 470 ? "" : "mr-2"}`} />
            {windowWidth < 470 ? "" : "Upload"}
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button
            variant={isReading ? "destructive" : "secondary"}
            size={"default"}
            onClick={handleReadAloud}
            disabled={!activePDFContent || activePDFContent.length === 0}
            title={isReading ? "Stop Reading" : "Read Aloud"}
          >
            {isReading ? (
              <StopCircle
                className={`w-6 h-6 ${windowWidth < 470 ? "" : "mr-2"}`}
              />
            ) : (
              <Volume2
                className={`w-6 h-6 ${windowWidth < 470 ? "" : "mr-2"}`}
              />
            )}
            {windowWidth < 470 ? "" : isReading ? "Stop" : "Read"}
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ResetPDF />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <PageInputForm />
        </NavigationMenuItem>
      </NavigationMenuList>
      <GoUpButton />
    </NavigationMenu>
  );
};

export default PdfMenuBar;
