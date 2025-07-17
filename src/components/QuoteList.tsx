import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";

type Quote = {
  id: number;
  text: string;
  author: string;
};

type Props = {
  quotes: Quote[];
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
};

export const QuoteList: React.FC<Props> = ({ quotes, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-36 w-full">
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="relative border rounded-2xl bg-white hover:shadow-md transition p-6 overflow-hidden"
        >
          <p className="text-lg italic mb-2">"{quote.text}"</p>
          <p className="text-sm text-gray-500">— {quote.author}</p>

          {(onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-24">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(quote.id)}>
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(quote.id)}
                    className="text-red-500 focus:text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ))}
    </div>
  );
};
