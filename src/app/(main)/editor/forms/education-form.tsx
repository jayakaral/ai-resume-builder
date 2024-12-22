import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { educationSchema, EducationValues } from '@/lib/schema.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import EducationItem from './education-form-item'
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
import { EditorFormProps } from '@/lib/types'


const EducationForm = ({ resumeData, setResumeData }: EditorFormProps) => {

    const form = useForm<EducationValues>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            educations: resumeData.educations || [],
        }
    });


    const { fields, append, remove, move } = useFieldArray({
        control: form.control,
        name: "educations",
    });

    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

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
            if (!isValid) return;
            setResumeData((prev) => ({
                ...prev,
                educations: values.educations?.filter((edu) => edu !== undefined) || [],
            }));
        });
        return unsubscribe;
    }, [form, setResumeData]);


    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Education</h2>
                <p className="text-sm text-muted-foreground">
                    Add as many educations as you like.
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                    <DndContext
                        onDragEnd={handleDragEnd}
                        sensors={sensors}>
                        <SortableContext
                            items={fields}
                            strategy={verticalListSortingStrategy}
                        >
                            {fields.map((field, index) => (
                                <EducationItem
                                    key={field.id}
                                    id={field.id}
                                    form={form}
                                    index={index}
                                    remove={remove}
                                    isExpanded={expandedIndex === index}
                                    setExpandedIndex={setExpandedIndex}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            onClick={() => {
                                append({
                                    school: "",
                                    degree: "",
                                    startDate: "",
                                    endDate: "",
                                })
                                setExpandedIndex(fields.length)
                            }}
                        >
                            <Plus /> Add education
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EducationForm;

