import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { GripVertical, MoreVertical } from "lucide-react";
import { AddQuote } from "./AddModel";
import { useState } from "react";

type Quote = {
  id: number;
  text: string;
  author: string;
};

type Props = {
  quotes: Quote[];
  onDelete?: (id: number) => void;
   onEdit?: (quote: Quote) => void;
  onReorder?: (quotes: Quote[]) => void;
};

export const QuoteList: React.FC<Props> = ({
  quotes,
  onDelete,
  onEdit,
  onReorder,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = quotes.findIndex((q) => q.id === active.id);
      const newIndex = quotes.findIndex((q) => q.id === over.id);
      const updated = arrayMove(quotes, oldIndex, newIndex);
      onReorder?.(updated);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={quotes.map((q) => q.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-36 w-full">
          {quotes.map((quote) => (
            <SortableQuoteCard
              key={quote.id}
              quote={quote}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

// 👇 One draggable quote card
const SortableQuoteCard = ({
  quote,
  onDelete,
  onEdit,
}: {
  quote: Quote;
  onDelete?: (id: number) => void;
   onEdit?: (updated: Quote) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: quote.id });
    const [isEditOpen, setIsEditOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative flex border rounded-2xl bg-white hover:shadow-md transition p-6 overflow-hidden cursor-grab active:cursor-grabbing"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className=" mr-2 cursor-grab active:cursor-grabbing"
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
            onClick={() => {
              setIsEditOpen(true); // 👈 open the dialog
            }}
            className=" cursor-pointer"
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
        }}/>
    </div>
  );
};
