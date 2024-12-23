import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { generalInfoSchema, GeneralInfoValues } from '@/lib/schema.zod';
import { EditorFormProps } from '@/lib/types';
import FieldsOrder from './fields-order';


function GeneralInfoForm({ resumeData, setResumeData }: EditorFormProps) {
    const form = useForm<GeneralInfoValues>({
        resolver: zodResolver(generalInfoSchema),
        defaultValues: {
            title: resumeData.title || "",
            description: resumeData.description || "",
            fieldsOrder: resumeData.fieldsOrder,
        },
    });


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

                    <FieldsOrder
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                    />
                </form>
            </Form>
        </div>
    );
}

export default GeneralInfoForm;