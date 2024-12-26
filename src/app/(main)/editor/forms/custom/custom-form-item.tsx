import { CustomSectionValues } from '@/lib/schema.zod';
import React, { FC, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Plus, Trash, Pencil } from 'lucide-react';
import SortableItem from './sortable-item';
import { Input } from '@/components/ui/input';

interface CustomFormItemProps {
  id: string;
  index: number;
  remove: () => void;
  form: UseFormReturn<CustomSectionValues>;
}

const CustomFormItem: FC<CustomFormItemProps> = ({ id, index, remove, form }) => {
  const { fields, append, move, remove: Remove } = useFieldArray({
    control: form.control,
    name: `customSections.${index}.items`,
  });


  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        {isEditingTitle ? (
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditingTitle(false);
              }}
              className="flex items-center gap-2"
            >
              <Input
                {...form.register(`customSections.${index}.title`)}
                placeholder="Section Title"
                autoFocus
                onBlur={() => setIsEditingTitle(false)}
                className="border-none text-2xl outline-none focus-visible:ring-0 w-min min-w-0 focus-visible:border-b focus-visible:border-b-blue-500"
              />
            </form>
          </Form>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">
              {form.watch(`customSections.${index}.title`) || 'Untitled'}
            </h2>

            <Pencil
              onClick={() => setIsEditingTitle(true)}
              size={18}
              className="cursor-pointer hover:text-blue-800"
            />
          </>
        )}
        <Trash
          size={18}
          className="cursor-pointer hover:text-red-500"
          onClick={remove}
        />
      </div>

      <Form {...form}>
        <form className="space-y-4" suppressHydrationWarning>
          <DndContext onDragEnd={handleDragEnd} onDragStart={() => setExpandedIndex(null)} sensors={sensors}>
            <SortableContext items={fields} strategy={verticalListSortingStrategy}>
              {fields.map((field, i) => (
                <SortableItem
                  key={field.id}
                  id={field.id}
                  form={form}
                  index={i}
                  sectionIndex={index}
                  remove={() => Remove(i)}
                  isExpanded={expandedIndex === i}
                  setExpandedIndex={setExpandedIndex}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex ml-4">
            <Button
              type="button"
              onClick={() => {
                append({
                  title: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                })
                setExpandedIndex(fields.length)
              }}
            >
              <Plus className="mr-2" /> Add Entry
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomFormItem;
