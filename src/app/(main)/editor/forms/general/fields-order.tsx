import React, { useEffect } from 'react'
import { useForm, useFieldArray, UseFormReturn } from 'react-hook-form';
import { CSS } from '@dnd-kit/utilities';
import { DragEndEvent } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';
import { generalInfoSchema, GeneralInfoValues } from '@/lib/schema.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditorFormProps } from '@/lib/types';
import DndSortableContext from '@/components/dnd-sortable-context';

interface FieldsOrderProps {
    form: UseFormReturn<GeneralInfoValues>;
}

const FieldsOrder = ({ form }: FieldsOrderProps) => {

    const { fields, move } = useFieldArray({
        control: form.control,
        name: "fieldsOrder" as never,
    });

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

        <div className='space-y-4'>
            <h3 className="text-lg font-semibold text-center my-2">Fields Order</h3>
            <DndSortableContext
                items={fields}
                onDragEnd={handleDragEnd}
            >
                <ul className="space-y-2">
                    {fields.map((field, index) => (
                        <SortableItem
                            key={field.id}
                            id={field.id}
                            field={field}
                            index={index}
                            form={form}
                        />
                    ))}
                </ul>
            </DndSortableContext>
        </div>
    )
}



type SortableItemProps = {
    id: string;
    field: { id: string };
    index: number;
    form: UseFormReturn<GeneralInfoValues>;
};

const SortableItem: React.FC<SortableItemProps> = ({ id, field, index, form }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [isHovered, setIsHovered] = React.useState(false);


    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <div
                className="flex gap-2 relative items-center -ml-6"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className={cn(
                        "opacity-0 transition-opacity",
                        isHovered && "opacity-100",
                    )}
                >
                    <GripVertical className="size-5 cursor-grab text-muted-foreground focus:outline-none" />
                </div>

                <div
                    className={cn(
                        'rounded-md border bg-background shadow-sm py-2 select-none w-full px-3',
                        isDragging && "relative z-50 cursor-grab shadow-xl",
                    )}
                >
                    {form.watch(`fieldsOrder.${index}`)}
                </div>
            </div>
        </div>
    );
};



export default FieldsOrder
