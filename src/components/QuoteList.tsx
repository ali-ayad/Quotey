"use client";

import React, { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
} from "@dnd-kit/sortable";

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
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = quotes.findIndex((q) => q.id === active.id);
    const newIndex = quotes.findIndex((q) => q.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(quotes, oldIndex, newIndex);
    onReorder?.(reordered);
  };

  const activeQuote = quotes.find((q) => q.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={quotes.map((q) => q.id)}
       
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-28 w-full">
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

      {/* 🔽 Drag overlay to prevent layout shifting */}
      <DragOverlay>
        {activeQuote ? (
          <div className="w-full">
            <SortableQuoteCard
              quote={activeQuote}
              onDelete={onDelete}
              onEdit={onEdit}
              // optional: add styles here to indicate it's an overlay
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
