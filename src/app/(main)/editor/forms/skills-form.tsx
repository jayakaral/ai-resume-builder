import React, { useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { EditorFormProps } from '@/lib/types'

const SkillsForm = ({ resumeData, setResumeData }: EditorFormProps) => {

    const handleAddSkill = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const skill = formData.get("skill") as string;
        if (!skill) return;

        setResumeData(prev => ({
            ...prev,
            skills: [...new Set([...(prev.skills || []), skill])],
        }));

        e.currentTarget.reset();
    }, [setResumeData]);

    const handleDeleteSkill = useCallback((skillToRemove: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills?.filter((skill) => skill !== skillToRemove),
        }))
    }, [setResumeData]);


    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Skills</h2>
                <p className="text-sm text-muted-foreground">What are you good at?</p>
            </div>

            <form className="flex items-center" onSubmit={handleAddSkill}>
                <label className="sr-only">Skills</label>
                <div className="flex-1 flex gap-3">
                    <Input
                        name="skill"
                        placeholder="e.g. React.js, Node.js, graphic design, ..."
                    />
                    <Button type="submit">Add</Button>
                </div>
            </form>

            {resumeData.skills?.length ? (
                <div className="flex flex-wrap gap-2 mt-4 justify-stretch select-none">
                    {resumeData.skills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center px-4 py-2 border rounded-md bg-gray-100 text-sm font-medium dark:text- black dark:bg-gray-800"
                        >
                            <span>{skill}</span>
                            <button
                                type="button"
                                onClick={() => handleDeleteSkill(skill)}
                                className="text-gray-500 hover:text-red-600 ml-2"
                            >
                                <Delete size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default SkillsForm;
