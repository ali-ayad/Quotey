// components/AddQuoteDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";

export function AddQuote() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Quote</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new quote</DialogTitle>
          <DialogDescription>
            Share a thought-provoking or inspiring quote.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <textarea
            placeholder="Quote"
            className="w-full border px-3 py-2 rounded resize-none min-h-[100px]"
          />

          <input
            type="text"
            placeholder="Author"
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
