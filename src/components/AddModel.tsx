"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

type AddQuoteProps = {
  mode: "add" | "edit";
  initialText?: string;
  initialAuthor?: string;
  onAdd?: () => void;
  onSave?: (updatedQuote: { id: number; text: string; author: string }) => void;
  quoteId?: number;

  // For external control
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function AddQuote({
  mode,
  initialText = "",
  initialAuthor = "",
  onAdd,
  onSave,
  quoteId,
  open,
  onOpenChange,
}: AddQuoteProps) {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (mode === "edit") {
      setQuote(initialText);
      setAuthor(initialAuthor);
    }
  }, [mode, initialText, initialAuthor]);

  const handleSubmit = () => {
    const trimmedText = quote.trim();
    const trimmedAuthor = author.trim();

    if (!trimmedText) return;

    if (mode === "add") {
      const newQuote = {
        id: Date.now(),
        text: trimmedText,
        author: trimmedAuthor,
      };

      const existingQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
      const updatedQuotes = [...existingQuotes, newQuote];
      localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
      onAdd?.();
    }

    if (mode === "edit" && quoteId != null) {
      onSave?.({
        id: quoteId,
        text: trimmedText,
        author: trimmedAuthor,
      });
    }

    setQuote("");
    setAuthor("");
    onOpenChange?.(false); // close externally if controlled
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {mode === "add" && (
        <DialogTrigger asChild>
          <Button>Add Quote</Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === "add" ? "Add a new quote" : "Edit quote"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <textarea
            placeholder="Quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            className="w-full border px-3 py-2 rounded resize-none min-h-[100px]"
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex w-full gap-2 pt-4">
            <DialogClose asChild className="w-full">
              <Button onClick={handleSubmit}>
                {mode === "add" ? "Add" : "Save"}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
