import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { summarySchema } from "@/lib/schema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditorFormProps } from '@/lib/types'


const SummaryForm = ({ resumeData, setResumeData }: EditorFormProps) => {

    const form = useForm({
        resolver: zodResolver(summarySchema),
        defaultValues: {
            summary: resumeData.summary || "",
        },
    });

    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
            const isValid = await form.trigger();
            if (!isValid) return;
            setResumeData(prev => ({ ...prev, ...values }));
        });
        return unsubscribe;
    }, [form, setResumeData]);

    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Professional summary</h2>
                <p className="text-sm text-muted-foreground">
                    Write a short introduction for your resume or let the AI generate one
                    from your entered data.
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only">Professional summary</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="A brief, engaging text about yourself"
                                        rows={6}
                                    />
                                </FormControl>
                                <FormMessage />
                                {/* <GenerateSummaryButton
                                    resumeData={resumeData}
                                    onSummaryGenerated={(summary) =>
                                        form.setValue("summary", summary)
                                    }
                                /> */}
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}

export default SummaryForm