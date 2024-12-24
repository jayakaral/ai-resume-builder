import { Button } from '@/components/ui/button';
import { CustomSectionValues } from '@/lib/schema.zod';
import { EditorFormProps } from '@/lib/types';
import { Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import CustomFormItem from './custom-form-item';

const CustomForm = ({ resumeData, setResumeData }: EditorFormProps) => {
    const form = useForm<CustomSectionValues>({
        defaultValues: {
            customSections: resumeData.customSections ?? [],
        },
    });

    const { append, fields, remove } = useFieldArray({
        control: form.control,
        name: 'customSections',
    });


    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
            const isValid = await form.trigger();
            if (!isValid) return;

            const customSections = values.customSections?.filter(s => s !== undefined)
                .map(s => ({
                    title: s.title as string,
                    items: s.items?.filter(d => d !== undefined) ?? [],
                })) ?? [];
            setResumeData(prev => ({
                ...prev,
                customSections: customSections,
            }))
        });
        return unsubscribe;
    }, [form, setResumeData]);


    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="flex justify-center">
                <Button
                    type="button"
                    onClick={() => {
                        append({
                            title: 'Untitled',
                            items: [],
                        });
                    }}
                >
                    <Plus /> Add Custom Section
                </Button>
            </div>

            <div className="space-y-8">
                {fields.map((field, index) => (
                    <CustomFormItem
                        key={field.id}
                        id={field.id}
                        index={index}
                        remove={() => remove(index)}
                        form={form}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomForm;
