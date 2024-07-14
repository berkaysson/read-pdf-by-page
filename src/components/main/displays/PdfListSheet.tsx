import { FileBadge } from "lucide-react";
import { Button } from "../../../ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../ui/sheet";
import { SavedPDFsList } from "./SavedPDFsList";
import useWindowWidth from "../../../hooks/useWindowWidth";

function PdfListSheet() {
  const windowWidth = useWindowWidth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"sm"}>
          <FileBadge className={`w-4 h-4 ${windowWidth < 425 ? "" : "mr-2"}`} />
          {windowWidth < 425 ? "" : "Your PDFs"}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your PDFs</SheetTitle>
          <SheetDescription>List of your uploaded PDFs</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <SavedPDFsList />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="secondary" size={"sm"}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default PdfListSheet;
