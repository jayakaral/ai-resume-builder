import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { WorkExperienceValues } from '@/lib/schema.zod';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { showMonthYear } from '@/lib/utils'
import DatePicker from '@/components/date-picker';
import GenerateWorkExpButton from './generate-work-exp-btn';
import SortableItemMain from '@/components/sortable-item-main';

interface WorkExperienceItemProps {
    id: string;
    form: UseFormReturn<WorkExperienceValues>;
    index: number;
    remove: (index?: number | number[]) => void;
    isExpanded: boolean;
    setExpandedIndex: (index: number | null) => void;
}

const WorkExperienceItem = ({
    id,
    form,
    index,
    remove,
    isExpanded,
    setExpandedIndex
}: WorkExperienceItemProps) => {

    const { company, endDate, position, startDate } = form.watch(`workExperiences.${index}`);

    return (
        <SortableItemMain
            id={id}
            index={index}
            remove={remove}
            isExpanded={isExpanded}
            setExpandedIndex={setExpandedIndex}
            preview={(
                <>
                    <p className="">
                        {!(position || company) && "(Unspeficied)"}
                        {position} {company && `at ${company}`}
                    </p>
                    <p className="text-sm">
                        {showMonthYear(startDate)} {startDate && endDate && '-'} {showMonthYear(endDate)}
                    </p>
                </>
            )}>

            <FormField
                control={form.control}
                name={`workExperiences.${index}.position`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Job title</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`workExperiences.${index}.company`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-2 gap-3">
                <FormField
                    control={form.control}
                    name={`workExperiences.${index}.startDate`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    placeholder='Start Date'
                                    endDate={form.watch(`workExperiences.${index}.endDate`)}
                                    onChange={(date) => field.onChange(date)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`workExperiences.${index}.endDate`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    placeholder='End Date'
                                    startDate={form.watch(`workExperiences.${index}.startDate`)}
                                    onChange={(date) => field.onChange(date)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormDescription>
                Leave <span className="font-semibold">end date</span> empty if you are
                currently working here.
            </FormDescription>
            <FormField
                control={form.control}
                name={`workExperiences.${index}.description`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <div className="flex flex-col items-end">
                                <GenerateWorkExpButton
                                    onSuccess={(description) => field.onChange(description)}
                                />
                                <Textarea {...field} rows={6} />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </SortableItemMain>
    );
};

export default WorkExperienceItem;
