import React from "react";
import { Button } from "./ui/button";

type Quote = {
  id: number;
  text: string;
  author: string;
};

type Props = {
  quotes: Quote[];
  onDelete?: (id: number) => void;
};

export const QuoteList: React.FC<Props> = ({ quotes, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-36 w-full">
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="relative p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
        >
          <p className="text-lg italic mb-2">"{quote.text}"</p>
          <p className="text-right text-sm text-gray-500">— {quote.author}</p>

          {onDelete && (
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => onDelete(quote.id)}
            >
              Delete
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
