import React, { useEffect } from 'react';
import { useForm, useFieldArray, UseFormReturn } from 'react-hook-form';
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
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { generalInfoSchema, GeneralInfoValues } from '@/lib/schema.zod';
import { EditorFormProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';


function GeneralInfoForm({ resumeData, setResumeData }: EditorFormProps) {
    const form = useForm<GeneralInfoValues>({
        resolver: zodResolver(generalInfoSchema),
        defaultValues: {
            title: resumeData.title || "",
            description: resumeData.description || "",
            fieldsOrder: resumeData.fieldsOrder || ["educations", "workExperiences", "skills"],
        },
    });

    const { fields, move } = useFieldArray({
        control: form.control,
        name: "fieldsOrder" as never,
    });

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


    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
            const isValid = await form.trigger();
            if (isValid) {
                setResumeData((prev) => ({
                    ...prev,
                    title: values.title,
                    description: values.description,
                    fieldsOrder: values.fieldsOrder as string[],
                }));
            }
        });
        return unsubscribe;
    }, [form, setResumeData]);

    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">General info</h2>
                <p className="text-sm text-muted-foreground">
                    This will not appear on your resume.
                </p>
            </div>
            <Form {...form}>
                <form action="" className="space-y-3">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="My cool resume" autoFocus />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="A resume for my next job" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='pt-2'>
                        <p className='my-2 text-sm'>Fields Order</p>
                        <DndContext
                            onDragEnd={handleDragEnd}
                            sensors={sensors}>
                            <SortableContext
                                items={fields}
                                strategy={verticalListSortingStrategy}
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
                            </SortableContext>
                        </DndContext>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default GeneralInfoForm;


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

