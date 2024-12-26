import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Loader, WandSparklesIcon } from 'lucide-react'
import { useResume } from '@/hooks'
import { enhaceResume } from './actions'


type Props = {}

const ResumeEnhancerForm = (props: Props) => {

    const { resumeData } = useResume()

    const formSchema = z.object({
        description: z.string(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // console.log(JSON.stringify(resumeData, null, 2))
            const data = await enhaceResume(values.description, resumeData)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>OPEN</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Resume Enhancer</DialogTitle>
                    <DialogDescription>
                        Enhance your resume with AI as per the job description
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            autoFocus
                                            rows={6}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting && <Loader className="size-5 animate-spin" />}
                            <WandSparklesIcon className="size-4" />
                            Generate
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default ResumeEnhancerForm