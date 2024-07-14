import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { PageInputForm } from "../../components/main/forms/PageInputForm";
import { useContext } from "react";
import { PDFContext } from "../../context/pdf.context";
import { ProfileContext } from "../../context/profile.context";
import { SavedPdf } from "../../context/profile.types";
import { FcAddDatabase } from "react-icons/fc";
import { Button } from "../../ui/button";
import { FileUp } from "lucide-react";
import { ResetPDF } from "../main/forms/ResetPDF";

const PdfMenuBar = () => {
  const { handleAddSavedPdf } = useContext(ProfileContext);
  const {
    activePDFTitle,
    setProgress,
    setIsFileLoading,
    setFileLoadingType,
    activePDFContent,
  } = useContext(PDFContext);

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
      className="fixed bottom-0 left-0 p-2 m-2 rounded-md shadow-sm bg-primary"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <Button
            onClick={handleSave}
            disabled={activePDFTitle === "" || !activePDFTitle}
            type="button"
            variant="secondary"
            size={"sm"}
          >
            <FileUp className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ResetPDF />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <PageInputForm />
        </NavigationMenuItem>
        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default PdfMenuBar;
