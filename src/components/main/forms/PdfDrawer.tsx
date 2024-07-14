import { FilePlus2 } from "lucide-react";
import { Button } from "../../../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../ui/drawer";
import { AddNewPDF } from "./AddNewPDF";

function PdfDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild className="fixed right-4 top-4">
        <Button variant="default" size={"icon"}>
          <FilePlus2 size={25} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full max-w-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>Add New Document</DrawerTitle>
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
