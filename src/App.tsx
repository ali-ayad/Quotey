import { AddQuote } from "./components/AddModel";
import { QuoteList } from "./components/QuoteList";

function App() {
  const dummyQuotes = [
    {
      id: 1,
      author: "Albert Einstein",
      text: "Life is like riding a bicycle. To keep your balance you must keep moving.",
    },
    {
      id: 2,
      author: "Oscar Wilde",
      text: "Be yourself; everyone else is already taken.",
    },
    {
      id: 3,
      author: "Steve Jobs",
      text: "Stay hungry, stay foolish.",
    },
  ];

  return (
    <>
      <div className="flex  flex-col app-container justify-between max-w-7xl mx-auto py-6">
        <div className="w-full flex justify-between">
          {" "}
          <h1 className="font-bold text-3xl">Quotey</h1>
          <AddQuote />
        </div>

        <QuoteList quotes={dummyQuotes} />
      </div>
    </>
  );
}

export default App;
