import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EducationValues } from '@/lib/schema.zod'
import { showMonthYear } from '@/lib/utils'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import DatePicker from '@/components/date-picker'
import SortableItemMain from '@/components/sortable-item-main'

type EducationItemProps = {
    id: string;
    index: number;
    form: UseFormReturn<EducationValues>;
    remove: (index?: number | number[] | undefined) => void;
    isExpanded: boolean;
    setExpandedIndex: (index: number | null) => void;
};

const EducationItem = ({
    id,
    form,
    index,
    remove,
    isExpanded,
    setExpandedIndex
}: EducationItemProps) => {

    const { degree, endDate, school, startDate } = form.watch(`educations.${index}`);

    return (
        <SortableItemMain
            id={id}
            index={index}
            remove={remove}
            isExpanded={isExpanded}
            setExpandedIndex={setExpandedIndex}
            preview={(
                <>
                    <p className="truncate">
                        {!(degree || school) && "(Unspecified)"}
                        {degree} {school && degree && `at`} {school}
                    </p>
                    <p className="text-sm">
                        {showMonthYear(startDate)} {startDate && endDate && '-'} {showMonthYear(endDate)}
                    </p>
                </>
            )}
        >
            <FormField
                control={form.control}
                name={`educations.${index}.degree`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`educations.${index}.school`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>School</FormLabel>
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
                    name={`educations.${index}.startDate`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    endDate={form.watch(`educations.${index}.endDate`)}
                                    placeholder='Start Date'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`educations.${index}.endDate`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    startDate={form.watch(`educations.${index}.startDate`)}
                                    placeholder='End Date'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </SortableItemMain>
    )
};

export default EducationItem;