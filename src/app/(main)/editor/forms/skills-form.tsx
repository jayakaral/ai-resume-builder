import React, { useCallback, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Delete, Plus } from "lucide-react";
import { EditorFormProps } from '@/lib/types'
import { useFieldArray, useForm } from 'react-hook-form';
import { SkillsValues } from '@/lib/schema.zod';
import { Form } from '@/components/ui/form';
import DndSortableContext from '@/components/dnd-sortable-context';
import { DragEndEvent } from '@dnd-kit/core';
import SkillItem from './skill-item';

const SkillsForm = ({ resumeData, setResumeData }: EditorFormProps) => {

    const form = useForm<SkillsValues>({
        defaultValues: {
            skills: resumeData.skills || [],
        }
    });

    const { fields, append, remove, move } = useFieldArray({
        control: form.control,
        name: "skills",
    });

    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

    const handleDeleteSkill = useCallback((skillToRemove: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills?.filter((skill) => skill !== skillToRemove),
        }))
    }, [setResumeData]);

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
                skills: values.skills?.filter((skill) => skill !== undefined) || [],
            }));
        });
        return unsubscribe;
    }, [form, setResumeData]);


    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Skills</h2>
                <p className="text-sm text-muted-foreground">What are you good at?</p>
            </div>

            <Form {...form}>
                <form className="space-y-3">
                    <DndSortableContext
                        items={fields}
                        onDragEnd={handleDragEnd}
                        onDragStart={() => setExpandedIndex(null)}
                    >
                        {fields.map((field, index) => (
                            <SkillItem
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
                                    skill: '',
                                    level: "Expert"
                                })
                                setExpandedIndex(fields.length)
                            }}
                        >
                            <Plus /> Add Skill
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SkillsForm;
