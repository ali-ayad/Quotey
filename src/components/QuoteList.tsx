import React from "react";

type Quote = {
  id: number;
  text: string;
  author: string;
};

type Props = {
  quotes: Quote[];
};

export const QuoteList: React.FC<Props> = ({ quotes }) => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-36 w-full">
  {quotes.map((quote) => (
    <div
      key={quote.id}
      className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
    >
      <p className="text-lg italic mb-2">"{quote.text}"</p>
      <p className="text-right text-sm text-gray-500">— {quote.author}</p>
    </div>
  ))}
</div>

  );
};
