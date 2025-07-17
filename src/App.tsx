import { useEffect, useState } from "react";
import { AddQuote } from "./components/AddModel";
import { QuoteList } from "./components/QuoteList";

type Quote = {
  id: number;
  author: string;
  text: string;
};

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("quotes");
    if (stored) {
      setQuotes(JSON.parse(stored));
    }
  }, []);

  // Callback to refresh quote list after a new one is added
  const handleAddQuote = () => {
    const stored = localStorage.getItem("quotes");
    if (stored) {
      setQuotes(JSON.parse(stored));
    }
  };
  const handleDeleteQuote = (id: number) => {
  const stored = localStorage.getItem("quotes");
  if (!stored) return;

  const existing = JSON.parse(stored) as Quote[];
  const updated = existing.filter((q) => q.id !== id);
  localStorage.setItem("quotes", JSON.stringify(updated));
  setQuotes(updated);
};

const handleReorder = (newQuotes: Quote[]) => {
  localStorage.setItem("quotes", JSON.stringify(newQuotes));
  setQuotes(newQuotes);
};


  return (
    <div className="flex flex-col app-container justify-between max-w-7xl mx-auto py-6">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-3xl">Quotey</h1>
        <AddQuote onAdd={handleAddQuote} />
      </div>

      <QuoteList quotes={quotes} onDelete={handleDeleteQuote} onReorder={handleReorder} />
    </div>
  );
}

export default App;
