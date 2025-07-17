"use client";

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
import { useState } from "react";

type AddQuoteProps = {
  onAdd?: () => void;
};

export function AddQuote({ onAdd }: AddQuoteProps) {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const handleAddQuote = () => {
    const newQuote = {
      id: Date.now(),
      text: quote.trim(),
      author: author.trim(),
    };

    if (!newQuote.text) return;

    const existingQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
    const updatedQuotes = [...existingQuotes, newQuote];
    localStorage.setItem("quotes", JSON.stringify(updatedQuotes));

    setQuote("");
    setAuthor("");

    // Notify parent
    onAdd?.();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Quote</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-center">Add a new quote</DialogTitle>
         
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
              <Button onClick={handleAddQuote}>Add</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

