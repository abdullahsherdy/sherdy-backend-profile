import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Playground from "./Playground";

interface PlaygroundModalProps {
  initialCode: string;
  open: boolean;
  onClose: () => void;
}

const PlaygroundModal = ({ initialCode, open, onClose }: PlaygroundModalProps) => (
  <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="flex h-[92vh] w-[96vw] max-w-5xl flex-col p-3 sm:h-[85vh] sm:p-6">
      <DialogHeader>
        <DialogTitle>C# Playground</DialogTitle>
        <DialogDescription className="sr-only">Edit and run the code example in your browser</DialogDescription>
      </DialogHeader>
      <div className="min-h-0 flex-1">
        <Playground initialCode={initialCode} />
      </div>
    </DialogContent>
  </Dialog>
);

export default PlaygroundModal;
