import {
  Info,
  FilePlus2,
  Save,
  FolderOpen,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";

export function HowToUseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="transition-all duration-200 text-muted-foreground hover:text-foreground"
        >
          <Info className="w-5 h-5" />
          <span className="sr-only">How to Use</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-primary/60 bg-clip-text">
            Welcome to RPBP
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground/80">
            Follow this quick guide to get the most out of your experience.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 p-6 pt-2 h-[60vh] sm:h-auto overflow-y-auto pr-2">
          {/* Step 1: Add PDF */}
          <div className="flex items-start gap-4 p-4 transition-all duration-300 border group rounded-xl border-border/40 bg-card/50 hover:bg-muted/30 hover:shadow-sm hover:border-primary/20">
            <div className="flex items-center justify-center w-12 h-12 text-blue-500 transition-all duration-300 rounded-full shrink-0 bg-blue-500/10 ring-4 ring-blue-500/5 group-hover:ring-blue-500/10">
              <FilePlus2 className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold leading-none tracking-tight text-foreground">
                1. Add PDF
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Use{" "}
                <span className="font-medium text-foreground">"Add PDF"</span>{" "}
                to upload your documents.
                <br />
                <span className="inline-block mt-1 text-xs font-medium text-orange-500/80">
                  Note: Scanned books or images are not supported.
                </span>
              </p>
            </div>
          </div>

          {/* Step 2: Save Options */}
          <div className="flex items-start gap-4 p-4 transition-all duration-300 border group rounded-xl border-border/40 bg-card/50 hover:bg-muted/30 hover:shadow-sm hover:border-primary/20">
            <div className="flex items-center justify-center w-12 h-12 transition-all duration-300 rounded-full shrink-0 bg-emerald-500/10 text-emerald-500 ring-4 ring-emerald-500/5 group-hover:ring-emerald-500/10">
              <Save className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold leading-none tracking-tight text-foreground">
                2. Save PDF & Pages
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Use the{" "}
                <span className="font-medium text-foreground">
                  upload button
                </span>{" "}
                to save the entire PDF. To save just the current page, use the{" "}
                <span className="font-medium text-foreground">save button</span>{" "}
                on the bottom bar.
              </p>
            </div>
          </div>

          {/* Step 3: View Files */}
          <div className="flex items-start gap-4 p-4 transition-all duration-300 border group rounded-xl border-border/40 bg-card/50 hover:bg-muted/30 hover:shadow-sm hover:border-primary/20">
            <div className="flex items-center justify-center w-12 h-12 transition-all duration-300 rounded-full shrink-0 bg-violet-500/10 text-violet-500 ring-4 ring-violet-500/5 group-hover:ring-violet-500/10">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold leading-none tracking-tight text-foreground">
                3. View Saved PDFs
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Access your library by clicking{" "}
                <span className="font-medium text-foreground">"Your PDFs"</span>{" "}
                on the top bar.
              </p>
            </div>
          </div>

          <div className="w-full h-1 my-2 bg-border/100" />

          {/* Edge Read Aloud */}
          <div className="flex items-start gap-4 p-4 transition-all duration-300 border group rounded-xl border-border/40 bg-card/50 hover:bg-muted/30 hover:shadow-sm hover:border-primary/20">
            <div className="flex items-center justify-center w-12 h-12 transition-all duration-300 rounded-full shrink-0 bg-rose-500/10 text-rose-500 ring-4 ring-rose-500/5 group-hover:ring-rose-500/10">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold leading-none tracking-tight text-foreground">
                Edge Read Aloud (Mobile)
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                If reading doesn't start: Open app{" "}
                <span className="font-medium text-foreground">
                  without a PDF
                </span>
                . Click "Read Aloud" in browser menu. Refresh if needed until it
                starts.
                <span className="block mt-1 text-xs opacity-70">
                  Once active, you can open your PDFs.
                </span>
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 bg-muted/20">
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Got it, let's go!
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
