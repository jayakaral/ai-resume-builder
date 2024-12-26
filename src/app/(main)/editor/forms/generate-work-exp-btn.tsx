import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, WandSparklesIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { generateWorkExperience } from './actions';

interface GenerateWorkExpButtonProps {
    onSuccess: (description: string) => void;
}

const GenerateWorkExpButton = ({
    onSuccess
}: GenerateWorkExpButtonProps) => {
    const [showInputDialog, setShowInputDialog] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                type="button"
                onClick={() => {

                    setShowInputDialog(true);
                }}
            >
                <WandSparklesIcon className="size-4" />
                Smart fill (AI)
            </Button>
            <InputDialog
                open={showInputDialog}
                onOpenChange={setShowInputDialog}
                onSuccess={onSuccess}
            />
        </>
    );
}

const InputDialog = ({
    open,
    onOpenChange,
    onSuccess
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (description: string) => void;
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formSchema = z.object({
        description: z.string(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
        },
    });

    const onSubmit = async (data: { description: string }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await generateWorkExperience(data.description);
            onSuccess(response);
            onOpenChange(false);
        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate work experience</DialogTitle>
                    <DialogDescription>
                        Describe this work experience and the AI will generate an optimized
                        entry for you.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder={`E.g. "from nov 2019 to dec 2020 I worked at google as a software engineer, my tasks were: ..."`}
                                            autoFocus
                                            rows={6}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={loading}
                        >
                            {loading && <Loader className="size-5 animate-spin" />}
                            <WandSparklesIcon className="size-4" />
                            Generate
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default GenerateWorkExpButton
