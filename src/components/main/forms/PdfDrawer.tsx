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

function PdfDrawer() {
  const windowWidth = useWindowWidth();
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="default">
          <FilePlus2 className={`w-6 h-6 ${windowWidth < 470 ? "" : "mr-2"}`} />
          {windowWidth < 470 ? "" : "Add New PDF"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full max-w-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>Add New Document</DrawerTitle>
            <DrawerDescription>Click plus button to add new PDF</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <AddNewPDF />
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
