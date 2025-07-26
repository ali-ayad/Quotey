"use client";

import React from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,

} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";

import { SortableQuoteCard } from "./SortableQuoteCard";

// Types
type Quote = {
  id: number;
  text: string;
  author: string;
};

type Props = {
  quotes: Quote[];
  onDelete?: (id: number) => void;
  onEdit?: (updated: Quote) => void;
  onReorder?: (quotes: Quote[]) => void;
};

export const QuoteList: React.FC<Props> = ({
  quotes,
  onDelete,
  onEdit,
  onReorder,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = quotes.findIndex((q) => q.id === active.id);
    const newIndex = quotes.findIndex((q) => q.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(quotes, oldIndex, newIndex);
    onReorder?.(reordered);
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
          {quotes.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">
              No quotes available.
            </div>
          ) : (
            quotes.map((quote) => (
              <SortableQuoteCard
                key={quote.id}
                quote={quote}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};
