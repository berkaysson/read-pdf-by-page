import { FilePlus2 } from "lucide-react";
import { Button } from "../../../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../ui/drawer";
import { AddNewPDF } from "./AddNewPDF";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { useContext, useState } from "react";
import { PDFContext } from "../../../context/pdf.context";
import { ProfileContext } from "../../../context/profile.context";
import { validateFile } from "../../../utilities/fileValidation";
import { toast } from "../../../ui/use-toast";

function PdfDrawer() {
  const windowWidth = useWindowWidth();
  const { setNewPDF } = useContext(PDFContext);
  const { profile } = useContext(ProfileContext);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const isValid = validateFile(files[0], profile, toast);
      if (isValid) {
        setNewPDF(files[0]);
      }
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="default">
          <FilePlus2 className={`w-6 h-6 ${windowWidth < 470 ? "" : "mr-2"}`} />
          {windowWidth < 470 ? "" : "Add New PDF"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div
          className={`w-full max-w-sm mx-auto transition-all duration-200 ${
            isDragging ? "bg-accent/20 scale-105" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <DrawerHeader>
            <DrawerTitle>Add New Document</DrawerTitle>
            <DrawerDescription>
              Click plus button to add new PDF
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <AddNewPDF isDraggingProp={isDragging} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default PdfDrawer;
