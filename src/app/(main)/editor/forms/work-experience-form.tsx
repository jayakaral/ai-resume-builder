import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { workExperienceSchema, WorkExperienceValues } from '@/lib/schema.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import WorkExperienceItem from './work-experience-form-item'
import { DragEndEvent } from '@dnd-kit/core';
import { EditorFormProps } from '@/lib/types'
import DndSortableContext from '@/components/dnd-sortable-context'

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {

    const form = useForm<WorkExperienceValues>({
        resolver: zodResolver(workExperienceSchema),
        defaultValues: {
            workExperiences: resumeData.workExperiences || [],
        },
    });

    const { fields, append, remove, move } = useFieldArray({
        control: form.control,
        name: "workExperiences",
    });

    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

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
            setResumeData(prev => ({
                ...prev,
                workExperiences:
                    values.workExperiences?.filter((exp) => exp !== undefined) || [],
            }));
        });
        return unsubscribe;
    }, [form, setResumeData]);

    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Work experience</h2>
                <p className="text-sm text-muted-foreground">
                    Add as many work experiences as you like.
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                    <DndSortableContext
                        items={fields}
                        onDragEnd={handleDragEnd}
                        onDragStart={() => setExpandedIndex(null)}
                    >
                        {fields.map((field, index) => (
                            <WorkExperienceItem
                                key={field.id}
                                id={field.id}
                                form={form}
                                index={index}
                                remove={remove}
                                isExpanded={expandedIndex === index}
                                setExpandedIndex={setExpandedIndex}
                            />
                        ))}
                    </DndSortableContext>
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            onClick={() => {
                                append({
                                    position: "",
                                    company: "",
                                    startDate: "",
                                    endDate: "",
                                    description: "",
                                })
                                setExpandedIndex(fields.length)
                            }}
                        >
                            <Plus /> Add work experience
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default WorkExperienceForm;


