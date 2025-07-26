import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, MoreVertical } from "lucide-react";
import { cn } from "../lib/utils";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { AddQuote } from "./AddModel";

type Quote = {
  id: number;
  text: string;
  author: string;
};

type SortableQuoteCardProps = {
  quote: Quote;
  onDelete?: (id: number) => void;
  onEdit?: (updated: Quote) => void;
};

export const SortableQuoteCard: React.FC<SortableQuoteCardProps> = ({
  quote,
  onDelete,
  onEdit,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: quote.id });

  const [isEditOpen, setIsEditOpen] = useState(false);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative flex border rounded-2xl bg-white p-6",
        isDragging && "opacity-50"
      )}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="mr-2 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      <div>
        <p className="text-lg italic mb-2">"{quote.text}"</p>
        <p className="text-sm text-gray-500">— {quote.author}</p>
      </div>

      {(onDelete || onEdit) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-muted-foreground focus-visible:ring-0 focus:outline-none"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => setIsEditOpen(true)}
              className="cursor-pointer"
            >
              Edit
            </DropdownMenuItem>
            {onDelete && (
              <DropdownMenuItem
                onClick={() => onDelete(quote.id)}
                className="text-red-500 focus:text-red-600 cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <AddQuote
        mode="edit"
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        quoteId={quote.id}
        initialText={quote.text}
        initialAuthor={quote.author}
        onSave={(updatedQuote) => {
          onEdit?.(updatedQuote);
          setIsEditOpen(false);
        }}
      />
    </div>
  );
};
